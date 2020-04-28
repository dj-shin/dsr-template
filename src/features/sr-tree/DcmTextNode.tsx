import React from 'react';
import { TextNode } from '../../utils/dicom/srom';
import { DcmCodedEntry } from './DcmCodedEntry';
import { Box, TextField } from '@material-ui/core';

interface TextProps {
    node: TextNode;
}

export const DcmText: React.FunctionComponent<TextProps> = props => {
    const node = props.node;
    const nodeName = node.getNodeName();
    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            <Box mr={1}>
                <label>
                    <DcmCodedEntry code={nodeName}/>
                </label>
            </Box>
            <TextField multiline fullWidth defaultValue={node.getValue()}/>
        </Box>
    );
};
