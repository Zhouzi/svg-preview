#!/usr/bin/env node
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const http = require('http');
const getPort = require('get-port');
const opn = require('opn');
const pug = require('pug');

const template = fs.readFileSync(path.join(__dirname, 'index.pug'), 'utf8');
const render = pug.compile(template);

const dir = process.cwd();
const files = fs.readdirSync(dir);
const svgs = files.filter(file => /\.svg$/i.test(file)).map(filename => ({
    filename,
    path: path.join(dir, filename),
    code: fs.readFileSync(path.join(dir, filename), 'utf8')
}));

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(render({ dir, svgs }));
});

getPort().then(port => {
    server.listen(port);

    const URL = `http://127.0.0.1:${port}`;
    opn(URL);

    console.log('Serving svg files from:');
    console.log(dir);
    console.log(URL);
});
