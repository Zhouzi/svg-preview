/* eslint-disable no-console */
const http = require('http');
const opn = require('opn');
const render = require('./render');
const readSvgs = require('./readSvgs');

function serveSvgs(dir, port) {
    http
        .createServer((req, res) => {
            const svgs = readSvgs(dir);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(render({ dir, svgs }));
        })
        .listen(port);

    const URL = `http://127.0.0.1:${port}`;
    opn(URL);

    console.log('Serving svg files from:');
    console.log(dir);
    console.log(URL);
}

module.exports = serveSvgs;
