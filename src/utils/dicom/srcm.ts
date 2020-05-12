import { CodedEntry } from './srom';

export enum RelationshipType {
    Contains = 'CONTAINS',
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

export class SrRow {
    constructor(
        public nestingLevel: number,
        public relationshipType: RelationshipType,
        public valueType: ValueType,
        public concept: CodedEntry,
        public valueMultiplicity: [number, number],
        public requirementType: RequirementType,
    ) {
    }
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
