import React from 'react';
import { ImageNode } from '../../utils/dicom/srom';
import { DcmCodedEntry } from './DcmCodedEntry';

interface ImageProps {
    node: ImageNode;
}

export const DcmImage: React.FunctionComponent<ImageProps> = props => {
    const node = props.node;
    const nodeName = node.getNodeName();
    return (
        <React.Fragment>
            {nodeName ? <DcmCodedEntry code={nodeName}/> : <h3>Image Node</h3>}
            <ul>
                {node.getSOPClassUID() && <li>SOP Class ID : {node.getSOPClassUID()}</li>}
                {node.getSOPInstanceUID() && <li>SOP Instance ID : {node.getSOPInstanceUID()}</li>}
            </ul>
        </React.Fragment>
    );
};
