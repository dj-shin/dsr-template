import React, { useState } from 'react';
import { CodeNode } from '../../utils/dicom/srom';
import { DcmCodedEntry } from './DcmCodedEntry';
import { Box, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { getCodeset } from '../../services/code-service';

interface CodeProps {
    node: CodeNode;
}

export const DcmCode: React.FunctionComponent<CodeProps> = props => {
    const node = props.node;
    const nodeName = node.getNodeName();

    const [options, setOptions] = useState<string[]>([]);
    getCodeset(node.getValue().getCodingSchemeDesignator()).subscribe(setOptions);
    return (
        <Box display="flex" flexWrap="wrap" flexDirection="row" alignItems="center">
            {nodeName &&
            <Box flexGrow={1} mr={1}>
                <label>
                    <DcmCodedEntry code={nodeName}/>
                </label>
            </Box>}
            <Box flexGrow={3}>
                <Autocomplete
                    defaultValue={node.getValue().getCodeMeaning()}
                    options={options}
                    renderInput={(params) => <TextField  {...params}/>}
                />
            </Box>
        </Box>
    );
};
