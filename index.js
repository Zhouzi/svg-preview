#!/usr/bin/env node
const path = require('path');
const getPort = require('get-port');
const serveSvgs = require('./serveSvgs');

getPort().then(port => {
    const input = process.argv[2] || '.';
    const dir = path.join(process.cwd(), input);
    serveSvgs(dir, port);
});
