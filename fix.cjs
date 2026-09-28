
const fs = require('fs');
let c = fs.readFileSync('src/routes/index.tsx', 'utf8');
c = c.replace(/className=\{bsolute w-16 h-16 rounded-lg shadow-lg pointer-events-none \$\{shape\.color\}\}/g, 'className={\bsolute w-16 h-16 rounded-lg shadow-lg pointer-events-none \\}');
c = c.replace(/title=\{Local Time: \$\{currentTime\}\}/g, 'title={\Local Time: \\}');
fs.writeFileSync('src/routes/index.tsx', c);

