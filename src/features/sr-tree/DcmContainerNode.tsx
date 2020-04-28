import React from 'react';
import './DcmNode.css';
import { ContainerNode } from '../../utils/dicom/srom';
import { DcmNodeWrapper } from './NodeWrapper';
import { Typography } from '@material-ui/core';

interface ContainerProps {
    node: ContainerNode;
}

export const DcmContainer: React.FunctionComponent<ContainerProps> = props => {
    const children = props.node.children.map((node, idx) =>
        <li className="Node" key={idx.toString()}>
            <DcmNodeWrapper node={node}/>
        </li>
    );
    return (
        <React.Fragment>
            <Typography variant="subtitle1">
                {props.node.getNodeName()?.getCodeMeaning()}
            </Typography>
            <ul>
                {children}
            </ul>
        </React.Fragment>
    );
};
