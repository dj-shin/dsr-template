import React from 'react';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ImageIcon from '@material-ui/icons/Image';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import PersonIcon from '@material-ui/icons/Person';
import { Box } from '@material-ui/core';
import { ValueType } from '../utils/dicom/srcm';

interface ValueTypeListProps {
}
export const ValueTypeList: React.FunctionComponent<ValueTypeListProps> = props => {
    const valueTypes = [
        { type: ValueType.container,    icon: (<AccountTreeIcon fontSize="large"/>) },
        { type: ValueType.text,         icon: (<TextFieldsIcon fontSize="large"/>) },
        { type: ValueType.time,         icon: (<AccessTimeIcon fontSize="large"/>) },
        { type: ValueType.date,         icon: (<CalendarTodayIcon fontSize="large"/>) },
        { type: ValueType.image,        icon: (<ImageIcon fontSize="large"/>) },
        { type: ValueType.personName,   icon: (<PersonIcon fontSize="large"/>) },
    ];
    return (
        <Box display="flex" flexDirection="row">
            {valueTypes.map(({type, icon}) => (
                <Box
                    key={type}
                    border={1}
                    borderColor="black"
                    textAlign="center"
                    draggable={true}
                    onDragStart={(ev) => {
                        ev.dataTransfer.setData("text", type);
                    }}
                >
                    {icon}
                </Box>
            ))}
        </Box>
    );
};
