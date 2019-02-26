const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');

function readSvgs(dir) {
    const files = fs.readdirSync(dir);
    return files
        .filter(file => path.parse(file).ext === '.svg')
        .map(filename => {
            const content = fs.readFileSync(path.join(dir, filename), 'utf8');

            // svgs are going to be all listed on the same page so we need to make
            // sure they are not conflicting by resolving the <use>s
            const $ = cheerio.load(content, {
                xmlMode: true
            });
            const $svg = $('svg');

            $svg.find('use').each((index, use) => {
                const $use = $(use);
                const id = $use.attr('xlink:href');
                const $path = $svg.find(id).clone();

                // Copy the attributes to the path
                const attrs = $use.get(0).attribs;
                Object.keys(attrs).forEach(attr => {
                    $path.attr(attr, attrs[attr]);
                });

                // Replace the <use> with the path it points to
                $use.replaceWith($path);
            });

            // All defs must have been resolved by now
            // so we can safely remove them along with [id]s
            $svg.find('defs').remove();
            $svg.find('[id]').each((index, child) => $(child).removeAttr('id'));

            return {
                filename,
                path: path.join(dir, filename),
                code: $.html($svg)
            };
        });
}

module.exports = readSvgs;
