const fs = require('fs');
const path = require('path');

const STANDARD_SRC_DIR = path.join(__dirname, '..', 'resources', 'standard');
const OUTPUT_SRC_DIR = path.join(__dirname, '..', 'utils', 'dicom', 'standard');

function run() {
    let tags = {};
    for (const link of JSON.parse(fs.readFileSync(path.join(STANDARD_SRC_DIR, 'attributes.json')).toString())) {
        if (link.keyword && link.id) {
            tags[link.keyword] = link.id;
        }
    }
    fs.writeFileSync(path.join(OUTPUT_SRC_DIR, 'tags.json'), JSON.stringify(tags));
}

run();
