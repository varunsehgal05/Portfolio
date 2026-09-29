const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/Varun/Downloads/Portfolio/src/routes';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
    console.log('\n=== PAGE: ' + file + ' ===');
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // buttons
    let btnMatches = content.matchAll(/<button([^>]*)>([\s\S]*?)<\/button>/g);
    console.log('--- Buttons ---');
    for (const m of btnMatches) {
        let tagAttrs = m[1];
        let innerText = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        let onClick = tagAttrs.match(/onClick=\{([^}]+)\}/);
        console.log('Button: "' + innerText + '"');
        if (onClick) console.log('  -> onClick: ' + onClick[1]);
        else if (tagAttrs.includes('type="submit"')) console.log('  -> type="submit"');
        else console.log('  -> No onClick action defined (Possible broken or UI only)');
    }
    
    // links (a or Link)
    let linkMatches = content.matchAll(/<(?:a|Link)([^>]*)>([\s\S]*?)<\/(?:a|Link)>/g);
    console.log('--- Links ---');
    for (const m of linkMatches) {
        let tagAttrs = m[1];
        let innerText = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        let href = tagAttrs.match(/href="([^"]+)"/) || tagAttrs.match(/to="([^"]+)"/);
        console.log('Link: "' + innerText + '"');
        if (href) console.log('  -> href/to: ' + href[1]);
        else console.log('  -> No href defined');
    }
}
