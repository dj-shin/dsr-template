import React from 'react';
import { NumericNode } from '../../utils/dicom/srom';
import { DcmCodedEntry } from './DcmCodedEntry';

interface NumProps {
    node: NumericNode;
}

export const DcmNum: React.FunctionComponent<NumProps> = props => {
    const node = props.node;
    const nodeName = node.getNodeName();
    return (
        <React.Fragment>
            {nodeName && <DcmCodedEntry code={nodeName}/>}: {node.getValue()} <DcmCodedEntry code={node.getUnits()}/>
        </React.Fragment>
    );
};
