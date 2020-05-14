import { CodedEntry } from './srom';

export enum RelationshipType {
    contains = 'CONTAINS',
    hasObservationContext = 'HAS OBS CONTEXT',
    hasConceptModifier = 'HAS CONCEPT MOD',
    hasProperties = 'HAS PROPERTIES',
    hasAcquisitionContext = 'HAS ACQ CONTEXT',
    inferredFrom = 'INFERRED FROM',
    selectedFrom = 'SELECTED FROM',

    refHasProperties = 'R-HAS PROPERTIES',
    refInferredFrom = 'R-INFERRED FROM',
    refSelectedFrom = 'R-SELECTED FROM',
}

export enum ValueType {
    container = 'CONTAINER',
    code = 'CODE',
    image = 'IMAGE',
    text = 'TEXT',
    number = 'NUM',
    include = 'INCLUDE',
    composite = 'COMPOSITE',
    spatialCoord = 'SCOORD',
    temporalCoord = 'TCOORD',
    spatialCoord3d = 'SCOORD3D',
    waveform = 'WAVEFORM',
    personName = 'PNAME',
    uidref = 'UIDREF',
    date = 'DATE',
    time = 'TIME',
    datetime = 'DATETIME',
}

export enum RequirementType {
    mandatory = 'M',
    userOption = 'U',
    mandatoryConditional = 'MC',
    userOptionConditional = 'UC',
    conditional = 'C',
}

export interface CodedConceptConstraint {
    toString(): string;
}

interface SingleCodedEntry extends CodedConceptConstraint {
    code: CodedEntry;
}

export class EnumeratedValue implements SingleCodedEntry {
    constructor(
        public code: CodedEntry,
    ) {}

    toString(): string {
        const csv = this.code.getCodingSchemeVersion() ? ` [${this.code.getCodingSchemeVersion()}]` : '';
        return `EV (${this.code.getCodeValue()}, ${this.code.getCodingSchemeDesignator()}${csv}, "${this.code.getCodeMeaning()}")`;
    }
}
export class DefinedTerm implements SingleCodedEntry {
    constructor(
        public code: CodedEntry,
    ) {}

    toString(): string {
        const csv = this.code.getCodingSchemeVersion() ? ` [${this.code.getCodingSchemeVersion()}]` : '';
        return `DT (${this.code.getCodeValue()}, ${this.code.getCodingSchemeDesignator()}${csv}, "${this.code.getCodeMeaning()}")`;
    }
}

interface ContextGroup extends CodedConceptConstraint {
    cid: number;    // number?
    name?: string;
}
export class BaselineCID implements ContextGroup {
    constructor(
        public cid: number,
        public name: string | undefined,
    ) {}

    toString(): string {
        const name = this.name ? ` ${this.name}` : '';
        return `BCID ${this.cid}${name}`;
    }
}
export class DefinedCID implements ContextGroup {
    constructor(
        public cid: number,
        public name: string | undefined,
    ) {}

    toString(): string {
        const name = this.name ? ` ${this.name}` : '';
        return `DCID ${this.cid}${name}`;
    }
}

interface TemplateReference extends CodedConceptConstraint {
    tid: number;
    name?: string;
}
export class BaselineTID implements TemplateReference {
    constructor(
        public tid: number,
        public name: string | undefined,
    ) {}

    toString(): string {
        const name = this.name ? ` ${this.name}` : '';
        return `BTID ${this.tid}${name}`;
    }
}
export class DefinedTID implements TemplateReference {
    constructor(
        public tid: number,
        public name: string | undefined,
    ) {}

    toString(): string {
        const name = this.name ? ` ${this.name}` : '';
        return `DTID ${this.tid}${name}`;
    }
}

export class SrRow {
    constructor(
        public relationshipType: RelationshipType | undefined,
        public valueType: ValueType,
        public concept: CodedConceptConstraint | undefined,
        public valueMultiplicity: [number, number],
        public requirementType: RequirementType,
        public children: SrRow[],
    ) {}
}

export class SrTemplate {
    constructor(
        public tid: number,
        public name: string,
        public extensible: boolean,
        public isRoot: boolean,
        public orderSignificant: boolean,
        public rows: SrRow[],
    ) {
    }
}

export const measurementReport = new SrTemplate(
    1500,
    'Measurement Report',
    true,
    true,
    false,
    [
        new SrRow(
            undefined,
            ValueType.container,
            new DefinedCID(7021, 'Measurement Report Document Titles'),
            [1, 1],
            RequirementType.mandatory,
            [
                new SrRow(
                    RelationshipType.hasConceptModifier,
                    ValueType.include,
                    new DefinedTID(1204, 'Language of Content Item and Descendants'),
                    [1, 1],
                    RequirementType.mandatory,
                    [],
                ),
                new SrRow(
                    RelationshipType.hasObservationContext,
                    ValueType.include,
                    new DefinedTID(1001, 'Observation Context'),
                    [1, 1],
                    RequirementType.mandatory,
                    [],
                ),
                new SrRow(
                    RelationshipType.hasConceptModifier,
                    ValueType.code,
                    new EnumeratedValue(new CodedEntry('121058', 'DCM', 'Procedure reported', null)),
                    [1, Infinity],
                    RequirementType.mandatory,
                    [],
                ),
                new SrRow(
                    RelationshipType.contains,
                    ValueType.include,
                    new DefinedTID(1600, 'Image Library'),
                    [1, 1],
                    RequirementType.mandatory,
                    [],
                ),
                new SrRow(
                    RelationshipType.contains,
                    ValueType.container,
                    new EnumeratedValue(new CodedEntry('126010', 'DCM', 'Imaging Measurments', null)),
                    [1, 1],
                    RequirementType.conditional,
                    [
                        new SrRow(
                            RelationshipType.hasConceptModifier,
                            ValueType.include,
                            new DefinedTID(4019, 'Algorithm Identification'),
                            [1, 1],
                            RequirementType.userOption,
                            [],
                        ),
                        new SrRow(
                            RelationshipType.contains,
                            ValueType.include,
                            new DefinedTID(1401, 'Planar ROI Measurements and Qualitative Evaluations'),
                            [1, Infinity],
                            RequirementType.userOption,
                            [],
                        ),
                    ],
                ),
            ],
        )
    ]
);
