import React from 'react';
import { PNameNode } from '../../utils/dicom/srom';
import { DcmCodedEntry } from './DcmCodedEntry';
import { NameComponents } from '../../utils/dicom/nativeModel';

interface NameComponentsProps {
    name: NameComponents;
}
const DcmNameComponent: React.FunctionComponent<NameComponentsProps> = props => {
    const name = props.name;
    return (
        <React.Fragment>
            {name.namePrefix} {name.givenName} {name.middleName} {name.familyName} {name.nameSuffix}
        </React.Fragment>
    );
};


interface PNameProps {
    node: PNameNode;
}
export const DcmPName: React.FunctionComponent<PNameProps> = props => {
    const node = props.node;
    const nodeName = node.getNodeName();
    const pname = node.getValue();
    return (
        <React.Fragment>
            {nodeName && <DcmCodedEntry code={nodeName}/>}
            <ul>
                {pname.phonetic &&
                <li>
                    Phonetic: <DcmNameComponent name={pname.phonetic}/>
                </li>}
                {pname.alphabetic &&
                <li>
                    Alphabetic: <DcmNameComponent name={pname.alphabetic}/>
                </li>}
                {pname.ideographic &&
                <li>
                    Ideographic: <DcmNameComponent name={pname.ideographic}/>
                </li>}
            </ul>
        </React.Fragment>
    );
};
