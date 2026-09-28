const fs = require('fs');
const latex = fs.readFileSync('Varun_Sehgal_Resume_Updated.tex', 'utf8');
const html = `<html>
<body>
<textarea id="t" style="width: 100%; height: 500px;">${latex.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>
<button id="b" onclick="document.getElementById('t').select(); document.execCommand('copy');">Copy to Clipboard</button>
</body>
</html>`;
fs.writeFileSync('copy_resume.html', html);
