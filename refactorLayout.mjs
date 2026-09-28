import fs from 'fs';
import path from 'path';

const routesDir = path.join(process.cwd(), 'src/routes');

function processFile(filePath) {
    if (!filePath.endsWith('.tsx') || filePath.endsWith('__root.tsx')) return;
    console.log('Processing', filePath);
    let content = fs.readFileSync(filePath, 'utf-8');

    // 1. Remove TopNav import if it exists and nothing else is imported from it
    content = content.replace(/import\s*{\s*TopNav\s*}\s*from\s*(['"])@\/components\/TopNav\1;?\s*\n?/, '');
    // 2. Remove WorkspaceNav import
    content = content.replace(/import\s*{\s*WorkspaceNav\s*}\s*from\s*(['"])@\/components\/WorkspaceNav\1;?\s*\n?/, '');

    // 3. Remove the top <nav> block
    // A naive approach: find <nav ... </nav> block that contains <TopNav />
    const navRegex = /<nav[^>]*>[\s\S]*?<\/nav>/g;
    content = content.replace(navRegex, (match) => {
        if (match.includes('<TopNav />') || match.includes('menu') || match.includes('rocket_launch')) {
            return ''; // Strip the entire top nav!
        }
        return match;
    });

    // 4. Remove <WorkspaceNav />
    content = content.replace(/<WorkspaceNav[^>]*\/>/g, '');

    fs.writeFileSync(filePath, content, 'utf-8');
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else {
            processFile(fullPath);
        }
    }
}

walk(routesDir);
console.log('Done refactoring layout.');
