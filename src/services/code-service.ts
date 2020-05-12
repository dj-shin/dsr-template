import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CodedEntry } from '../utils/dicom/srom';

const getCodesetInternal = (csd: string): string[] => {
    switch (csd) {
        case 'RFC5646': {
            return [
                'English',
                'Korean',
                'Spanish',
                'French',
            ];
        }
        case 'LN': {
            return [
                'Imaging procedure',
                'Magnetic resonance imaging guidance',
                'Multiparametric MRI',
                'Multiparametric MRI of prostate',
                'Multiparametric MRI of whole body',
                'Dynamic magnetic resonance imaging of knee',
                'Dynamic magnetic resonance imaging of pelvis',
                'CT unspecified body region',
                'MRI unspecified body region',
                'NM unspecified body region',
                'PET unspecified body region',
                'PET whole body',
            ];
        }
        default: {
            return ['Unknown Coding Scheme Designator'];
        }
    }
};
export const getCodeset = (code: CodedEntry): Observable<string[]> => {
    const csd = code.getCodingSchemeDesignator();
    const cm = code.getCodeMeaning();
    const list = getCodesetInternal(csd);
    if (list.findIndex(v => v === cm) < 0) {
        list.push(cm);
    }
    return of(list).pipe(delay(1000));
};
