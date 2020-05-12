import React from 'react';
import { PNameNode } from '../../utils/dicom/srom';
import { NameComponents } from '../../utils/dicom/nativeModel';
import { Box, Typography } from '@material-ui/core';

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
    const pname = node.getValue();
    return (
        <Box display="flex" flexWrap="wrap" flexDirection="row" alignItems="center" width="100%"
            pl={1}>
            {pname.phonetic &&
            <Box display="flex" flexWrap="wrap" flexDirection="row" alignItems="center" flexGrow={1}>
                <Typography>
                    Phonetic : <DcmNameComponent name={pname.phonetic}/>
                </Typography>
            </Box>}
            {pname.alphabetic &&
            <Box display="flex" flexWrap="wrap" flexDirection="row" alignItems="center" flexGrow={1}>
                <Typography>
                    Alphabetic : <DcmNameComponent name={pname.alphabetic}/>
                </Typography>
            </Box>}
            {pname.ideographic &&
            <Box display="flex" flexWrap="wrap" flexDirection="row" alignItems="center" flexGrow={1}>
                <Typography>
                    Ideographic : <DcmNameComponent name={pname.ideographic}/>
                </Typography>
            </Box>}
        </Box>
    );
};
