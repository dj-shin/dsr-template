import React from 'react';
import { CodedEntry } from '../../utils/dicom/srom';
import { Typography } from '@material-ui/core';

interface CodedEntryProps {
    code: CodedEntry;
}

export const DcmCodedEntry: React.FunctionComponent<CodedEntryProps> = props => {
    const code = props.code;
    return (
        <Typography>
            {code.getCodeMeaning()}
        </Typography>
    );
};
