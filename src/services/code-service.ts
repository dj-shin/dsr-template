import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

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
export const getCodeset = (csd: string): Observable<string[]> => {
    return of(getCodesetInternal(csd)).pipe(delay(1000));
};
