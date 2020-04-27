import { DicomDataSet, PersonName } from './nativeModel';
import { Tag } from './common';

export class CodedEntry {
    constructor(
        private cv: string,
        private csd: string,
        private cm: string,
        private csv: string | null,
    ) { }

    getCodeValue(): string {
        return this.cv;
    }
    getCodingSchemeDesignator(): string {
        return this.csd;
    }
    getCodeMeaning(): string {
        return this.cm;
    }
    getCodingSchemeVersion(): string | null {
        return this.csv;
    }

    equals(obj: any): boolean {
        return (obj instanceof CodedEntry) &&
            obj.getCodeValue() === this.getCodeValue() &&
            obj.getCodingSchemeDesignator() === this.getCodingSchemeDesignator();
    }
}

export class Node {
    prev: Node;
    next: Node;

    constructor(
        private nodeName: CodedEntry | null,
        private nodeType: string,
        private relationshipType: string | null,
        private parent: Node | null,
        public children: Node[],
    ) {
        this.prev = this;
        this.next = this;
    }

    getNodeName(): CodedEntry | null {
        return this.nodeName;
    }
    getNodeType(): string {
        return this.nodeType;
    }
    getRelationshipType(): string | null {
        return this.relationshipType;
    }

    getParentNode(): Node | null {
        return this.parent;
    }
    getFirstChild(name?: CodedEntry): Node | null {
        const candidates = name ? this.children.filter(node => node.getNodeName() === name) : this.children;
        if (candidates) {
            return candidates[0];
        } else {
            return null;
        }
    }
    getLastChild(): Node | null {
        if (this.hasChildNodes()) {
            return this.children[-1];
        } else {
            return null;
        }
    }
    getPreviousSibling(): Node | null {
        if (this.prev === this) {
            return null;
        } else {
            return this.prev;
        }
    }
    getNextSibling(): Node | null {
        if (this.next === this) {
            return null;
        } else {
            return this.next;
        }
    }
    getNextNamedSibling(name: CodedEntry): Node | null {
        let node = this.getNextSibling();
        while (node) {
            if (node.getNodeName() === name) {
                return node;
            } else {
                node = node.getNextSibling();
            }
        }
        return null;
    }

    insertBefore(newNode: Node, refNode?: Node): Node {
        if (refNode && !this.children.includes(refNode)) {
            throw new Error(`Node ${refNode} is not children of ${this}`);
        } else {
            if (!refNode) {
                this.appendChild(newNode);
            } else {
                this.children.splice(this.children.findIndex(n => n === refNode), 0, newNode);
                const prev = refNode.getPreviousSibling();
                if (prev) {
                    prev.next = newNode;
                    newNode.prev = prev;
                }
                newNode.next = refNode;
                refNode.prev = newNode;
            }
        }
        return this;
    }

    removeChild(oldNode: Node): Node {
        return this;
    }

    appendChild(newNode: Node): Node {
        const last = this.getLastChild();
        if (last) {
            last.next = newNode;
            newNode.prev = last;
        }
        this.children.push(newNode);
        return this;
    }

    hasChildNodes(): boolean {
        return !!this.children;
    }

    cloneNode(deep: boolean): Node {
        if (deep) {
            return new Node(this.nodeName, this.nodeType, this.relationshipType, this.parent,
                this.children.map(node => node.cloneNode(deep)));
        } else {
            return new Node(this.nodeName, this.nodeType, this.relationshipType, this.parent, this.children);
        }
    }
}

export class ContainerNode extends Node {
    constructor(
        private continuity: string,
        nodeName: CodedEntry,
        relationshipType: string | null,
        parent: Node | null,
        children: Node[],
    ) {
        super(nodeName, 'CONTAINER', relationshipType, parent, children);
    }

    getContinuityOfContent(): string {
        return this.continuity;
    }
}

export class CodeNode extends Node {
    constructor(
        private value: CodedEntry,
        nodeName: CodedEntry,
        relationshipType: string | null,
        parent: Node | null,
        children: Node[],
    ) {
        super(nodeName, 'CODE', relationshipType, parent, children);
    }

    getValue(): CodedEntry {
        return this.value;
    }
}

export class NumericNode extends Node {
    constructor(
        private value: number,
        private units: CodedEntry,
        nodeName: CodedEntry,
        relationshipType: string | null,
        parent: Node | null,
        children: Node[],
    ) {
        super(nodeName, 'NUM', relationshipType, parent, children);
    }

    getValue(): number {
        return this.value;
    }
    getUnits(): CodedEntry {
        return this.units;
    }
}

export class TextNode extends Node {
    constructor(
        private value: string,
        nodeName: CodedEntry,
        relationshipType: string | null,
        parent: Node | null,
        children: Node[],
    ) {
        super(nodeName, 'TEXT', relationshipType, parent, children);
    }

    getValue(): string {
        return this.value;
    }
}

export class PNameNode extends Node {
    constructor(
        private value: PersonName,
        nodeName: CodedEntry,
        relationshipType: string | null,
        parent: Node | null,
        children: Node[],
    ) {
        super(nodeName, 'PNAME', relationshipType, parent, children);
    }

    getValue(): PersonName {
        return this.value;
    }
}

export class DateNode extends Node {
    constructor(
        private value: string,
        nodeName: CodedEntry,
        relationshipType: string | null,
        parent: Node | null,
        children: Node[],
    ) {
        super(nodeName, 'DATE', relationshipType, parent, children);
    }

    getValue(): string {
        return ''
    }
}

export class TimeNode extends Node {
    constructor(
        private value: string,
        nodeName: CodedEntry,
        relationshipType: string | null,
        parent: Node | null,
        children: Node[],
    ) {
        super(nodeName, 'TIME', relationshipType, parent, children);
    }

    getValue(): string {
        return '';
    }
}

export interface DateTimeNode extends Node {
    getValue(): string;
}

export interface UIDRefNode extends Node {
    getValue(): string;
}

export class CompositeNode extends Node {
    constructor(
        private SOPClassUID: string,
        private SOPInstanceUID: string,
        nodeName: CodedEntry | null,
        nodeType: string,
        relationshipType: string | null,
        parent: Node | null,
        children: Node[],
    ) {
        super(nodeName, nodeType, relationshipType, parent, children);
    }

    getSOPClassUID(): string {
        return this.SOPClassUID;
    }
    getSOPInstanceUID(): string {
        return this.SOPInstanceUID;
    }
}

export class ImageNode extends CompositeNode {
    constructor(
        SOPClassUID: string,
        SOPInstanceUID: string,
        nodeName: CodedEntry | null,
        relationshipType: string | null,
        parent: Node | null,
        children: Node[],
        private frameNumbers?: number[],
        private presentationSOPClassUID?: string,
        private presentationSOPInstanceUID?: string,
    ) {
        super(SOPClassUID, SOPInstanceUID, nodeName, 'IMAGE', relationshipType, parent, children);
    }

    getFrameNumbers(): number[] | undefined {
        return this.frameNumbers || [];
    }
    getPresentationSOPClassUID(): string | undefined {
        return this.presentationSOPClassUID;
    }
    getPresentationSOPInstanceUID(): string | undefined {
        return this.presentationSOPInstanceUID;
    }
}

export interface WaveformNode extends CompositeNode {
    getChannelNumbers(): number[];
}

export interface SCoordNode extends Node {
    getGraphicType(): string;
    getGraphicData(): number[];
}

export interface TCoordNode extends Node {
    getRangeType(): string;
    getSamplePositions(): number[];
    getTimeOffsets(): number[];
    getDateTimes(): string[];
}

export interface ReferenceNode extends Node {
    getNode(): Node;
}

export class NodeFactory {
    createNode(dicomDataset: DicomDataSet, parentNode: Node | null): Node {
        const valueTypeNode = dicomDataset.getAttributeByTag(Tag.ValueType).getValue();
        const relationshipType = parentNode ?
            dicomDataset.getAttributeByTag(Tag.RelationshipType).getValue().value :
            null;
        switch (valueTypeNode.value) {
            case 'CONTAINER': {
                const node = new ContainerNode(
                    dicomDataset.getAttributeByTag(Tag.ContinuityOfContent).getValue().value,
                    getCodedEntry(dicomDataset.getAttributeByTag(Tag.ConceptNameCodeSequence).getItems()[0].dataset),
                    relationshipType,
                    parentNode,
                    []  // temporary
                );
                const contentSequence = dicomDataset.getAttributeByTag(Tag.ContentSequence);
                if (contentSequence) {
                    node.children = contentSequence.getItems().map(item => this.createNode(item.dataset, node));
                }
                return node;
            }
            case 'PNAME': {
                const node = new PNameNode(
                    dicomDataset.getAttributeByTag(Tag.PersonName).getPersonName(),
                    getCodedEntry(dicomDataset.getAttributeByTag(Tag.ConceptNameCodeSequence).getItems()[0].dataset),
                    relationshipType,
                    parentNode,
                    []
                );
                const contentSequence = dicomDataset.getAttributeByTag(Tag.ContentSequence);
                if (contentSequence) {
                    node.children = contentSequence.getItems().map(item => this.createNode(item.dataset, node));
                }
                return node;
            }
            case 'TEXT': {
                const node = new TextNode(
                    dicomDataset.getAttributeByTag(Tag.TextValue).getValue().value,
                    getCodedEntry(dicomDataset.getAttributeByTag(Tag.ConceptNameCodeSequence).getItems()[0].dataset),
                    relationshipType,
                    parentNode,
                    []
                );
                const contentSequence = dicomDataset.getAttributeByTag(Tag.ContentSequence);
                if (contentSequence) {
                    node.children = contentSequence.getItems().map(item => this.createNode(item.dataset, node));
                }
                return node;
            }
            case 'CODE': {
                const node = new CodeNode(
                    getCodedEntry(dicomDataset.getAttributeByTag(Tag.ConceptCodeSequence).getItems()[0].dataset),
                    getCodedEntry(dicomDataset.getAttributeByTag(Tag.ConceptNameCodeSequence).getItems()[0].dataset),
                    relationshipType,
                    parentNode,
                    []
                );
                const contentSequence = dicomDataset.getAttributeByTag(Tag.ContentSequence);
                if (contentSequence) {
                    node.children = contentSequence.getItems().map(item => this.createNode(item.dataset, node));
                }
                return node;
            }
            case 'IMAGE': {
                const referencedSOPSequence = dicomDataset.getAttributeByTag(Tag.ReferencedSOPSequence).getItems()[0].dataset;
                const conceptNameCodeSequence = dicomDataset.getAttributeByTag(Tag.ConceptNameCodeSequence);
                const node = new ImageNode(
                    referencedSOPSequence.getAttributeByTag(Tag.ReferencedSOPClassUID).extractValue() as string,
                    referencedSOPSequence.getAttributeByTag(Tag.ReferencedSOPInstanceUID).extractValue() as string,
                    conceptNameCodeSequence ? getCodedEntry(conceptNameCodeSequence.getItems()[0].dataset) : null,
                    relationshipType,
                    parentNode,
                    []
                );
                const contentSequence = dicomDataset.getAttributeByTag(Tag.ContentSequence);
                if (contentSequence) {
                    node.children = contentSequence.getItems().map(item => this.createNode(item.dataset, node));
                }
                return node;
            }
            case 'DATE': {
                const node = new DateNode(
                    dicomDataset.getAttributeByTag(Tag.Date).extractValue() as string,
                    getCodedEntry(dicomDataset.getAttributeByTag(Tag.ConceptNameCodeSequence).getItems()[0].dataset),
                    relationshipType,
                    parentNode,
                    []
                );
                const contentSequence = dicomDataset.getAttributeByTag(Tag.ContentSequence);
                if (contentSequence) {
                    node.children = contentSequence.getItems().map(item => this.createNode(item.dataset, node));
                }
                return node;
            }
            case 'TIME': {
                const node = new TimeNode(
                    dicomDataset.getAttributeByTag(Tag.Time).extractValue() as string,
                    getCodedEntry(dicomDataset.getAttributeByTag(Tag.ConceptNameCodeSequence).getItems()[0].dataset),
                    relationshipType,
                    parentNode,
                    []
                );
                const contentSequence = dicomDataset.getAttributeByTag(Tag.ContentSequence);
                if (contentSequence) {
                    node.children = contentSequence.getItems().map(item => this.createNode(item.dataset, node));
                }
                return node;
            }
            case 'NUM': {
                const measuredValue = dicomDataset.getAttributeByTag(Tag.MeasuredValueSequence).getItems()[0].dataset;
                const node = new NumericNode(
                    measuredValue.getAttributeByTag(Tag.NumericValue).extractValue() as number,
                    getCodedEntry(measuredValue.getAttributeByTag(Tag.MeasurementUnitsCodeSequence).getItems()[0].dataset),
                    getCodedEntry(dicomDataset.getAttributeByTag(Tag.ConceptNameCodeSequence).getItems()[0].dataset),
                    relationshipType,
                    parentNode,
                    []
                );
                const contentSequence = dicomDataset.getAttributeByTag(Tag.ContentSequence);
                if (contentSequence) {
                    node.children = contentSequence.getItems().map(item => this.createNode(item.dataset, node));
                }
                return node;
            }
            default: {
                throw new Error(`Unknown value type: ${valueTypeNode.value}`);
            }
        }
    }
}

function getCodedEntry(dicomDataSet: DicomDataSet): CodedEntry {
    return new CodedEntry(
        dicomDataSet.getAttributeByTag(Tag.CodeValue).getValue().value,
        dicomDataSet.getAttributeByTag(Tag.CodingSchemeDesignator).getValue().value,
        dicomDataSet.getAttributeByTag(Tag.CodeMeaning).getValue().value,
        dicomDataSet.getAttributeByTag(Tag.CodingSchemeVersion)?.getValue().value,
    );
}
