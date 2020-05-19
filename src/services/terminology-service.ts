import { Observable, of } from 'rxjs';
import {
    CodedConceptConstraint,
    ContextGroup,
    DefinedCID,
    DefinedTID,
    EnumeratedValue,
    SingleCodedEntry,
    TemplateReference
} from '../utils/dicom/srcm';
import { singleton } from '../utils';
import { CodedEntry } from '../utils/dicom/srom';

const contextGroupList = [
    new DefinedCID(7021, 'Measurement Report Document Titles'),
];
const codeList = [
    new EnumeratedValue(new CodedEntry('121058', 'DCM', 'Procedure reported')),
    new EnumeratedValue(new CodedEntry('126010', 'DCM', 'Imaging Measurements')),
];
const templateList = [
    new DefinedTID(1204, 'Language of Content Item and Descendants'),
    new DefinedTID(1001, 'Observation Context'),
    new DefinedTID(1600, 'Image Library'),
    new DefinedTID(4019, 'Algorithm Identification'),
    new DefinedTID(1401, 'Planar ROI Measurements and Qualitative Evaluations'),
];
const cidToCodes = (cid: number): CodedEntry[] => {
    switch (cid) {
        case 100:
            return [
                new CodedEntry('363679005', 'SCT', 'Imaging procedure'),
                new CodedEntry('258177008', 'SCT', 'Magnetic resonance imaging guidance'),
                new CodedEntry('126020', 'DCM', 'Multiparametric MRI'),
                new CodedEntry('126021', 'DCM', 'Multiparametric MRI of prostate'),
                new CodedEntry('126022', 'DCM', 'Multiparametric MRI of whole body'),
                new CodedEntry('433139009', 'SCT', 'Dynamic magnetic resonance imaging of knee'),
                new CodedEntry('446315002', 'SCT', 'Dynamic magnetic resonance imaging of pelvis'),
                new CodedEntry('25045-6', 'LN', 'CT unspecified body region'),
            ];
        case 7021:
            return [
                new CodedEntry('126000', 'DCM', 'Imaging Measurement Report'),
                new CodedEntry('126001', 'DCM', 'Oncology Measurement Report'),
                new CodedEntry('126002', 'DCM', 'Dynamic Contrast MR Measurement Report'),
                new CodedEntry('126003', 'DCM', 'PET Measurement Report'),
            ];
        case 210:
            return [
                new CodedEntry('272741003', 'SCT', 'Laterality'),
                new CodedEntry('106233006', 'SCT', 'Topographical modifier'),
            ];
        case 211:
            return [
                ...cidToCodes(245),
                ...cidToCodes(212),
            ];
        case 212:
            return [
                new CodedEntry('255549009', 'SCT', 'Anterior'),
                new CodedEntry('26216008', 'SCT', 'Central'),
                new CodedEntry('46053002', 'SCT', 'Distal'),
                new CodedEntry('261089000', 'SCT', 'Inferior'),
                new CodedEntry('49370004', 'SCT', 'Lateral'),
                new CodedEntry('130290', 'DCM', 'Median'),
                new CodedEntry('C25569', 'NCIt', 'Middle'),
                new CodedEntry('103342007', 'SCT', 'Mid-longitudinal'),
                new CodedEntry('255551008', 'SCT', 'Posterior'),
                new CodedEntry('40415009', 'SCT', 'Proximal'),
                new CodedEntry('264217000', 'SCT', 'Superior'),
            ];
        case 245:
            return [
                ...cidToCodes(244),
                new CodedEntry('130290', 'DCM', 'Median'),
            ];
        case 244:
            return [
                ...cidToCodes(247),
                new CodedEntry('51440002', 'SCT', 'Bilateral'),
                new CodedEntry('66459002', 'SCT', 'Unilateral'),
            ];
        case 247:
            return [
                new CodedEntry('24028007', 'SCT', 'Right'),
                new CodedEntry('7771000', 'SCT', 'Left'),
            ];
        default:
            return [];
    }
}

export const getContextGroupList = singleton((): Observable<ContextGroup[]> => {
    return of(contextGroupList);
});
export const getCodeList = singleton((): Observable<SingleCodedEntry[]> => {
    return of(codeList);
})
export const getTemplateList = singleton((): Observable<TemplateReference[]> => {
    return of(templateList);
})

const isContextGroup = (constraint: CodedConceptConstraint): constraint is ContextGroup => {
    return 'cid' in constraint;
};

export const getCodesFromContextGroup = ((contextGroup?: CodedConceptConstraint): Observable<CodedEntry[]> => {
    if (contextGroup === undefined) {
        return of(Object.values(cidToCodes).reduce((acc, x) => [...acc, ...x], []));
    } else if (isContextGroup(contextGroup)) {
        return of(cidToCodes(contextGroup.cid));
    } else {
        return of([]);
    }
});
