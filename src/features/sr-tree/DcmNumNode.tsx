import React from 'react';
import { NumericNode } from '../../utils/dicom/srom';
import { DcmCodedEntry } from './DcmCodedEntry';
import { Box, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

interface NumProps {
    node: NumericNode;
}

export const DcmNum: React.FunctionComponent<NumProps> = props => {
    const node = props.node;
    const nodeName = node.getNodeName();
    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            {nodeName &&
            <Box mr={1}>
                <label>
                    <DcmCodedEntry code={nodeName}/>
                </label>
            </Box>}
            <Box mx={1}>
                <TextField
                    type="number"
                    defaultValue={node.getValue()}
                />
            </Box>
            <Box flexGrow={1}>
                <Autocomplete
                    renderInput={(params) => <TextField {...params}/>}
                    options={[node.getUnits().getCodeMeaning(), 'others']}
                    defaultValue={node.getUnits().getCodeMeaning()}
                />
            </Box>
        </Box>
    );
};
