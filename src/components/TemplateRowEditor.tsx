import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

interface TemplateRowEditorProps {
}
export const TemplateRowEditor: React.FunctionComponent<TemplateRowEditorProps> = props => {
    const rows = [
        { name: 'Value Type', description: 'NUM' },
        { name: 'Concept Name', description: 'Imaging Measurement Report' },
        { name: 'Value Multiplicity', description: '1' },
        { name: 'Requirement Type', description: 'M' },
        { name: 'Condition', description: '' },
        { name: 'Value set constraint', description: '' },
    ];
    return (
        <Box>
            <h2>Row Editor</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Parameter Name</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell>{row.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
};
