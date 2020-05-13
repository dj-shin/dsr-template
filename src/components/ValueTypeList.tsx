import React from 'react';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ImageIcon from '@material-ui/icons/Image';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import PersonIcon from '@material-ui/icons/Person';
import { Box } from '@material-ui/core';

interface ValueTypeListProps {
}
export const ValueTypeList: React.FunctionComponent<ValueTypeListProps> = props => {
    return (
        <Box display="flex" flexDirection="row">
            <Box border={1} borderColor="black" textAlign="center" draggable={true}>
                <AccountTreeIcon fontSize="large"/>
            </Box>
            <Box border={1} borderColor="black" textAlign="center" draggable={true}>
                <TextFieldsIcon fontSize="large"/>
            </Box>
            <Box border={1} borderColor="black" textAlign="center" draggable={true}>
                <AccessTimeIcon fontSize="large"/>
            </Box>
            <Box border={1} borderColor="black" textAlign="center" draggable={true}>
                <CalendarTodayIcon fontSize="large"/>
            </Box>
            <Box border={1} borderColor="black" textAlign="center" draggable={true}>
                <ImageIcon fontSize="large"/>
            </Box>
            <Box border={1} borderColor="black" textAlign="center" draggable={true}>
                <PersonIcon fontSize="large"/>
            </Box>
        </Box>
    );
};
