const path = require('path');
const fs = require('fs');

function readSvgs(dir) {
    const files = fs.readdirSync(dir);
    return files.filter(file => /\.svg$/i.test(file)).map(filename => ({
        filename,
        path: path.join(dir, filename),
        code: fs.readFileSync(path.join(dir, filename), 'utf8')
    }));
}

module.exports = readSvgs;
