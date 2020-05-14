import React, { useEffect, useState } from 'react';
import { CodeNode } from '../../utils/dicom/srom';
import { Box, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { getCodeset } from '../../services/code-service';

interface CodeProps {
    node: CodeNode;
}

export const DcmCode: React.FunctionComponent<CodeProps> = props => {
    const node = props.node;

    const [options, setOptions] = useState<string[]>([]);
    useEffect(() => {
        const subscription = getCodeset(node.getValue()).subscribe(setOptions);
        return () => {
            subscription.unsubscribe();
        };
    }, [node]);
    return (
        <React.Fragment>
            <Box flexGrow={3}>
                <Autocomplete
                    defaultValue={node.getValue().getCodeMeaning()}
                    options={options}
                    renderInput={(params) => <TextField  {...params}/>}
                />
            </Box>
            {props.children}
        </React.Fragment>
    );
};
