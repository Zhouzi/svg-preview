const path = require('path');
const fs = require('fs');
const http = require('http');
const getPort = require('get-port');
const opn = require('opn');

fs.readdir(process.cwd(), (err, files) => {
    if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        process.exit(1);
    }

    const svgs = files
        .filter(file => /\.svg$/i.test(file))
        .map(file => fs.readFileSync(path.join(process.cwd(), file), 'utf8'));

    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(
            `<!doctype html><html><head></head><body>${svgs.join(
                ''
            )}</body></html>`
        );
        process.exit();
    });

    getPort().then(port => {
        server.listen(port);
        opn(`http://127.0.0.1:${port}`);
    });
});
