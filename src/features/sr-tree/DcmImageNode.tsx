import React from 'react';
import { ImageNode } from '../../utils/dicom/srom';
import { DcmCodedEntry } from './DcmCodedEntry';
import { Typography } from '@material-ui/core';

interface ImageProps {
    node: ImageNode;
}

export const DcmImage: React.FunctionComponent<ImageProps> = props => {
    const node = props.node;
    const nodeName = node.getNodeName();
    return (
        <React.Fragment>
            {nodeName ?
                <DcmCodedEntry code={nodeName}/> :
                <Typography variant="subtitle2">Image Node</Typography>}
            <ul>
                {node.getSOPClassUID() &&
                    <li>
                        <Typography>
                            SOP Class ID : {node.getSOPClassUID()}
                        </Typography>
                    </li>}
                {node.getSOPInstanceUID() &&
                <li>
                    <Typography>
                        SOP Instance ID : {node.getSOPInstanceUID()}
                    </Typography>
                </li>}
            </ul>
        </React.Fragment>
    );
};
