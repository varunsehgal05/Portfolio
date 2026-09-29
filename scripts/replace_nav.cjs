const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/Varun/Downloads/Portfolio/src/routes';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let original = content;

    // Find the block of links that contain File, Edit, View, Window, Help
    // This is tricky because they are slightly different in each file.
    // Generally, they are a sequence of <a> or <button> tags with these words.
    const regex = /(?:<a[^>]*>(?:File|Edit|View|Window|Help)<\/a>[\s]*){5}/g;
    const regex2 = /(?:<a[^>]*>[\s\S]*?(?:File|Edit|View|Window|Help)[\s\S]*?<\/a>[\s]*){5}/g;
    const regex3 = /(?:<button[^>]*>[\s\S]*?(?:File|Edit|View|Window|Help)[\s\S]*?<\/button>[\s]*){5}/g;

    let replaced = false;
    
    if (regex2.test(content)) {
        content = content.replace(regex2, '<TopNav />\n');
        replaced = true;
    } else if (regex3.test(content)) {
        content = content.replace(regex3, '<TopNav />\n');
        replaced = true;
    }

    if (replaced) {
        if (!content.includes('import { TopNav }')) {
            content = content.replace(/((?:import .*?;\r?\n)+)/, "$1import { TopNav } from \"@/components/TopNav\";\n");
        }
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log('Replaced in ' + file);
    }
}
