const path = require('path');
const fs = require('fs');
const pug = require('pug');

const template = fs.readFileSync(path.join(__dirname, 'index.pug'), 'utf8');
const render = pug.compile(template);

module.exports = render;
