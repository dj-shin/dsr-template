const fs = require('fs');
const path = require('path');

const STANDARD_SRC_DIR = path.join(__dirname, '..', 'resources', 'standard');
const OUTPUT_SRC_DIR = path.join(__dirname, '..', 'utils', 'dicom', 'standard');

function run() {
    let sops = {};     // SOP Class UID -> CIOD Name
    for (const link of JSON.parse(fs.readFileSync(path.join(STANDARD_SRC_DIR, 'sops.json')).toString())) {
        sops[link.id] = link.ciod;
    }
    let ciods = {};     // CIOD Name -> CIOD ID
    for (const link of JSON.parse(fs.readFileSync(path.join(STANDARD_SRC_DIR, 'ciods.json')).toString())) {
        ciods[link.name] = link.id;
    }
    let ciodToModule = {};      // CIOD ID -> List<{ Module ID, Usage (M / U), Information Entity }>
    for (const link of JSON.parse(fs.readFileSync(path.join(STANDARD_SRC_DIR, 'ciod_to_modules.json')).toString())) {
        if (!ciodToModule[link.ciodId]) {
            ciodToModule[link.ciodId] = [];
        }
        ciodToModule[link.ciodId].push({ moduleId: link.moduleId, usage: link.usage, informationEntity: link.informationEntity });
    }
    let moduleToAttributes = {};      // Module ID -> List<{ Path, Tag, Type }>
    for (const link of JSON.parse(fs.readFileSync(path.join(STANDARD_SRC_DIR, 'module_to_attributes.json')).toString())) {
        if (!moduleToAttributes[link.moduleId]) {
            moduleToAttributes[link.moduleId] = [];
        }
        moduleToAttributes[link.moduleId].push({ path: link.path, tag: link.tag, type: link.type });
    }

    let tags = {};
    for (const link of JSON.parse(fs.readFileSync(path.join(STANDARD_SRC_DIR, 'attributes.json')).toString())) {
        if (link.keyword && link.id) {
            tags[link.keyword] = link.id;
        }
    }
    fs.writeFileSync(path.join(OUTPUT_SRC_DIR, 'tags.json'), JSON.stringify(tags));
}

run();
