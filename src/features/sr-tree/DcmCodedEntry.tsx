import React from 'react';
import { CodedEntry } from '../../utils/dicom/srom';

interface CodedEntryProps {
    code: CodedEntry;
}

export const DcmCodedEntry: React.FunctionComponent<CodedEntryProps> = props => {
    const code = props.code;
    return (
        <React.Fragment>{code.getCodeMeaning()}</React.Fragment>
    );
};
