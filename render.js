const path = require('path');
const fs = require('fs');
const pug = require('pug');

function render(locals) {
    const template = fs.readFileSync(path.join(__dirname, 'index.pug'), 'utf8');
    return pug.render(template, locals);
}

module.exports = render;
