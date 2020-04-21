import * as assert from 'assert';

const VR = [
    'AE',   // Application Entity
    'AS',   // Age String
];

export type VR = string;

export class NativeDicomModel {
    constructor(
        public dataset: DicomDataSet,
    ) {
    }

    static parse(xmlElement: Element): NativeDicomModel {
        assert.equal(xmlElement.nodeName, 'NativeDicomModel');
        return new NativeDicomModel(DicomDataSet.parse(xmlElement));
    }

    deserialize(xmlDoc: Document, parent?: Element) {
        const root = parent ? parent : xmlDoc;
        const node = xmlDoc.createElement('NativeDicomModel');
        this.dataset.deserialize(xmlDoc, node);
        root.appendChild(node);
    }
}

export class DicomDataSet {
    constructor(
        public attributes: DicomAttribute[] = []
    ) {}

    static parse(xmlElement: Element): DicomDataSet {
        const attributes = Array.from(xmlElement.children).map(elem => DicomAttribute.parse(elem));
        return new DicomDataSet(attributes);
    }

    deserialize(xmlDoc: Document, parent?: Element) {
        for (const attribute of this.attributes) {
            attribute.deserialize(xmlDoc, parent);
        }
    }
}

interface DicomValue {
    deserialize(xmlDoc: Document, parent?: Element): void;
}

export class DicomAttribute {
    constructor(
        public tag: string,
        public vr: VR,
        public keyword: string | null,
        public privateCreator: string | null,
        public value: DicomValue[] | null,
    ) { }

    static parse(xmlElement: Element): DicomAttribute {
        assert.equal(xmlElement.nodeName, 'DicomAttribute');

        const tag = xmlElement.getAttribute('tag');
        if (tag === null) {
            throw new Error(`Tag is empty: ${xmlElement}`);
        }

        const vr = xmlElement.getAttribute('vr');
        if (vr === null) {
            throw new Error(`VR is empty: ${xmlElement}`);
        }
        if (vr in VR) {
            throw new Error(`Invalid VR: ${vr}`);
        }

        const keyword = xmlElement.getAttribute('keyword');
        const privateCreator = xmlElement.getAttribute('privateCreator');

        let value = null;
        if (xmlElement.children.length > 0) {
            const children = Array.from(xmlElement.children);
            const valueTypes = new Set(children.map(elem => elem.nodeName));
            if (valueTypes.size !== 1) {
                throw new Error(`Heterogeneous values: ${xmlElement.children}`);
            }
            const valueType = valueTypes.values().next();
            switch (valueType.value) {
                case 'BulkData': {
                    assert.equal(children.length, 1);
                    value = children.map(elem => BulkData.parse(elem));
                    break;
                }
                case 'InlineBinary': {
                    assert.equal(children.length, 1);
                    value = children.map(elem => InlineBinary.parse(elem));
                    break;
                }
                case 'Value': {
                    value = children.map(elem => Value.parse(elem));
                    break;
                }
                case 'Item': {
                    value = children.map(elem => Item.parse(elem));
                    break;
                }
                case 'PersonName': {
                    value = children.map(elem => PersonName.parse(elem));
                    break;
                }
                default: {
                    throw new Error(`Invalid node: ${xmlElement.children}`);
                }
            }
        }

        return new DicomAttribute(tag, vr, keyword, privateCreator, value);
    }

    deserialize(xmlDoc: Document, parent?: Element) {
        const root = parent ? parent : xmlDoc;
        const node = xmlDoc.createElement('DicomAttribute');

        if (this.tag) {
            node.setAttribute('tag', this.tag);
        }
        if (this.vr) {
            node.setAttribute('vr', this.vr);
        }
        if (this.keyword) {
            node.setAttribute('keyword', this.keyword);
        }
        if (this.privateCreator) {
            node.setAttribute('privateCreator', this.privateCreator);
        }

        if (this.value) {
            for (const value of this.value) {
                value.deserialize(xmlDoc, node);
            }
        }

        root.appendChild(node);
    }
}

export class BulkData implements DicomValue {
    constructor(
        public uuid: string | null,
        public uri: string | null,
    ) {
    }

    static parse(xmlElement: Element): BulkData {
        assert.equal(xmlElement.nodeName, 'BulkData');
        const uuid = xmlElement.getAttribute('uuid');
        const uri = xmlElement.getAttribute('uri');
        if ((!uuid && !uri) || (uuid && uri)) {
            throw new Error(`BulkData must contain UUID xor URI: ${xmlElement}`);
        }
        return new BulkData(uuid, uri);
    }

    deserialize(xmlDoc: Document, parent?: Element) {
        const root = parent ? parent : xmlDoc;
        const node = xmlDoc.createElement('BulkData');
        if (this.uuid) {
            node.setAttribute('uuid', this.uuid);
        }
        if (this.uri) {
            node.setAttribute('uri', this.uri);
        }
        root.appendChild(node);
    }
}

export class Value implements DicomValue {
    constructor(
        public number: number,
        public value: string,
    ) {
    }

    static parse(xmlElement: Element): Value {
        assert.equal(xmlElement.nodeName, 'Value');
        const numberAttr = xmlElement.getAttribute('number');
        if (numberAttr === null) {
            throw new Error(`Number empty in Item: ${xmlElement}`);
        }
        const number = parseInt(numberAttr);
        const value = xmlElement.textContent;
        if (value === null) {
            throw new Error(`Empty Value: ${xmlElement}`);
        }
        return new Value(number, value);
    }

    deserialize(xmlDoc: Document, parent?: Element) {
        const root = parent ? parent : xmlDoc;
        const node = xmlDoc.createElement('Value');
        node.setAttribute('number', this.number.toString());
        node.textContent = this.value;
        root.appendChild(node);
    }
}

export class InlineBinary implements DicomValue {
    constructor(
        public value: string,
    ) {
    }

    static parse(xmlElement: Element): InlineBinary {
        assert.equal(xmlElement.nodeName, 'InlineBinary');
        const value = xmlElement.textContent;
        if (!value) {
            throw new Error(`InlineBinary empty: ${xmlElement}`);
        }
        return new InlineBinary(value);
    }

    deserialize(xmlDoc: Document, parent?: Element) {
        const root = parent ? parent : xmlDoc;
        const node = xmlDoc.createElement('InlineBinary');
        node.textContent = this.value;
        root.appendChild(node);
    }
}

export class Item implements DicomValue {
    constructor(
        public number: number,
        public dataset: DicomDataSet,
    ) {
    }

    static parse(xmlElement: Element): Item {
        assert.equal(xmlElement.nodeName, 'Item');
        const numberAttr = xmlElement.getAttribute('number');
        if (numberAttr === null) {
            throw new Error(`Number empty in Item: ${xmlElement}`);
        }
        const number = parseInt(numberAttr);
        const dataset = DicomDataSet.parse(xmlElement);
        return new Item(number, dataset);
    }

    deserialize(xmlDoc: Document, parent?: Element) {
        const root = parent ? parent : xmlDoc;
        const node = xmlDoc.createElement('Item');

        node.setAttribute('number', this.number.toString());
        this.dataset.deserialize(xmlDoc, node);
        root.appendChild(node);
    }
}

const getNode = (children: Element[], nodeName: string) => {
    const list = children.filter(elem => elem.nodeName === nodeName);
    if (list.length > 1) {
        throw new Error(`${nodeName} not unique in ${children}`);
    } else if (list.length === 1) {
        return list[0];
    } else {
        return null;
    }
};

export class PersonName implements DicomValue {
    constructor(
        public number: number,
        public alphabetic: NameComponents | null,
        public ideographic: NameComponents | null,
        public phonetic: NameComponents | null,
    ) {
    }

    static parse(xmlElement: Element): PersonName {
        assert.equal(xmlElement.nodeName, 'PersonName');
        const numberAttr = xmlElement.getAttribute('number');
        if (numberAttr === null) {
            throw new Error(`Number empty in Item: ${xmlElement}`);
        }
        const number = parseInt(numberAttr);

        const children = Array.from(xmlElement.children);
        const nameComponentsIfExists = (elem: Element | null) => {
            if (elem === null) {
                return null;
            } else {
                return NameComponents.parse(elem);
            }
        };
        const alphabetic = nameComponentsIfExists(getNode(children, 'Alphabetic'));
        const ideographic = nameComponentsIfExists(getNode(children, 'Ideographic'));
        const phonetic = nameComponentsIfExists(getNode(children, 'Phonetic'));

        return new PersonName(number, alphabetic, ideographic, phonetic);
    }

    deserialize(xmlDoc: Document, parent?: Element) {
        const root = parent ? parent : xmlDoc;
        const node = xmlDoc.createElement('PersonName');

        node.setAttribute('number', this.number.toString());
        if (this.alphabetic) {
            this.alphabetic.deserialize(xmlDoc, node);
        }
        if (this.ideographic) {
            this.ideographic.deserialize(xmlDoc, node);
        }
        if (this.phonetic) {
            this.phonetic.deserialize(xmlDoc, node);
        }
        root.appendChild(node);
    }
}

class NameComponents {
    constructor(
        public familyName: string | null,
        public givenName: string | null,
        public middleName: string | null,
        public namePrefix: string | null,
        public nameSuffix: string | null,
    ) {
    }

    static parse(xmlElement: Element): NameComponents {
        const children = Array.from(xmlElement.children);
        const getTextIfExists = (elem: Element | null) => {
            if (elem === null) {
                return null;
            } else {
                return elem.textContent;
            }
        };
        return new NameComponents(
            getTextIfExists(getNode(children, 'FamilyName')),
            getTextIfExists(getNode(children, 'GivenName')),
            getTextIfExists(getNode(children, 'MiddleName')),
            getTextIfExists(getNode(children, 'NamePrefix')),
            getTextIfExists(getNode(children, 'NameSuffix')),
        );
    }

    deserialize(xmlDoc: Document, parent?: Element) {
        const root = parent ? parent : xmlDoc;
        if (this.familyName !== null) {
            const familyName = xmlDoc.createElement('FamilyName');
            familyName.textContent = this.familyName;
            root.appendChild(familyName);
        }
        if (this.givenName !== null) {
            const givenName = xmlDoc.createElement('GivenName');
            givenName.textContent = this.givenName;
            root.appendChild(givenName);
        }
        if (this.middleName !== null) {
            const middleName = xmlDoc.createElement('MiddleName');
            middleName.textContent = this.middleName;
            root.appendChild(middleName);
        }
        if (this.namePrefix !== null) {
            const namePrefix = xmlDoc.createElement('MiddleName');
            namePrefix.textContent = this.namePrefix;
            root.appendChild(namePrefix);
        }
        if (this.nameSuffix !== null) {
            const nameSuffix = xmlDoc.createElement('MiddleName');
            nameSuffix.textContent = this.nameSuffix;
            root.appendChild(nameSuffix);
        }
    }
}
