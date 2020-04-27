import React from 'react';
import { ContainerNode } from '../../utils/dicom/srom';
import { DcmNodeWrapper } from './NodeWrapper';

interface ContainerProps {
    node: ContainerNode;
}

export const DcmContainer: React.FunctionComponent<ContainerProps> = props => {
    const children = props.node.children.map((node, idx) =>
        <li key={idx.toString()}>
            <DcmNodeWrapper node={node}/>
        </li>
    );
    return (
        <React.Fragment>
            <h2>{props.node.getNodeName()?.getCodeMeaning()} (container)</h2>
            <ul>
                {children}
            </ul>
        </React.Fragment>
    );
};
