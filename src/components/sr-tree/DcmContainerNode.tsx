import React from 'react';
import { ContainerNode } from '../../utils/dicom/srom';
import { NodeProps } from './NodeWrapper';
import { Typography } from '@material-ui/core';

interface ContainerProps extends NodeProps {
    node: ContainerNode;
}

export const DcmContainer: React.FunctionComponent<ContainerProps> = props => {
    return (
        <React.Fragment>
            <Typography variant="subtitle1">
                {props.node.getNodeName()?.getCodeMeaning()}
            </Typography>
            {props.children}
        </React.Fragment>
    );
};
