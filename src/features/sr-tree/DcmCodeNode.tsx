import React from 'react';
import { CodeNode } from '../../utils/dicom/srom';
import { DcmCodedEntry } from './DcmCodedEntry';

interface CodeProps {
    node: CodeNode;
}

export const DcmCode: React.FunctionComponent<CodeProps> = props => {
    const node = props.node;
    const nodeName = node.getNodeName();
    return (
        <React.Fragment>
            {nodeName && <DcmCodedEntry code={nodeName}/>}: <DcmCodedEntry code={node.getValue()}/> (code)
        </React.Fragment>
    );
};
