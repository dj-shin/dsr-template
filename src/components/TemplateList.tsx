import React, { useEffect, useState } from 'react';
import {
    Box, createStyles,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
    Theme,
    Tooltip,
    Typography
} from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import { TemplateReference } from '../utils/dicom/srcm';
import { getTemplateList } from '../services/terminology-service';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tooltip: {
            fontSize: theme.typography.pxToRem(15),
        },
    }),
);

interface TemplateListProps {
}
export const TemplateList: React.FunctionComponent<TemplateListProps> = props => {
    const [templates, setTemplates] = useState<TemplateReference[]>([]);
    const classes = useStyles();
    useEffect(() => {
        const subscription = getTemplateList().subscribe(setTemplates);
        return () => {
            subscription.unsubscribe();
        };
    }, []);
    return (
        <Box>
            <h2>Template List</h2>
            <TextField id="template-search" label='Search with template name or ID' fullWidth/>
            <List dense={false}>
                {templates.map(template => (
                    <Tooltip
                        key={template.tid}
                        title={
                            <Typography
                                className={classes.tooltip}
                            >
                                {template.getFullString()}
                            </Typography>
                        }
                    >
                        <ListItem key={template.tid}>
                            <ListItemIcon>
                            <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={template.name}
                        />
                    </ListItem>
                    </Tooltip>
                ))}
            </List>
        </Box>
    );
};
