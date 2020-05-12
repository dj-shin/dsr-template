import React from 'react';
import { TextNode } from '../../utils/dicom/srom';
import { Box, TextField } from '@material-ui/core';

interface TextProps {
    node: TextNode;
}

export const DcmText: React.FunctionComponent<TextProps> = props => {
    const node = props.node;
    return (
        <Box display="flex" flexWrap="wrap" flexDirection="row" alignItems="center" flexGrow={3}>
            <TextField multiline fullWidth defaultValue={node.getValue()}/>
        </Box>
    );
};
