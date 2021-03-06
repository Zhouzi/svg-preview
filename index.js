#!/usr/bin/env node
const getPort = require('get-port');
const serveSvgs = require('./serveSvgs');

getPort().then(port => {
    serveSvgs(process.argv[2] || '.', port);
});
