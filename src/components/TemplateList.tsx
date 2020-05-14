import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, TextField } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';

interface TemplateListProps {
}
export const TemplateList: React.FunctionComponent<TemplateListProps> = props => {
    const templates = [
        { tid: 300, name: 'Measurement' },
        { tid: 1420, name: 'Measurements Derived From Multiple ROI Measurements' },
        { tid: 1500, name: 'Imaging Measurement Report' },
        { tid: 1501, name: 'Measurement and Qualitative Evaluation Group' },
    ];
    return (
        <Box>
            <h2>Template List</h2>
            <TextField id="template-search" label='Search with template name or ID' fullWidth/>
            <List dense={false}>
                {templates.map(template => (
                    <ListItem key={template.tid}>
                        <ListItemIcon>
                            <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={template.name}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
