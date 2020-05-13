import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

interface TemplateParameterTableProps {
}
export const TemplateParameterTable: React.FunctionComponent<TemplateParameterTableProps> = props => {
    const rows = [
        { name: '$Measurement', description: 'Coded term or Context Group for Concept Name of measurement' },
        { name: '$Units', description: 'Units of Measurement' },
        { name: '$ModType', description: 'Modifier Name for Concept Name of measurement' },
    ];
    return (
        <div>
            <h2>Parameter Table</h2>
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
        </div>
    );
};
