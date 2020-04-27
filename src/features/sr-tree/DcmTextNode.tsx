import React from 'react';
import { TextNode } from '../../utils/dicom/srom';
import { DcmCodedEntry } from './DcmCodedEntry';

interface TextProps {
    node: TextNode;
}

export const DcmText: React.FunctionComponent<TextProps> = props => {
    const node = props.node;
    const nodeName = node.getNodeName();
    return (
        <React.Fragment>
            {nodeName && <DcmCodedEntry code={nodeName}/>}: {node.getValue()}
        </React.Fragment>
    );
};
