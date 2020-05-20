import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { SrRow } from '../utils/dicom/srcm';

interface TemplateRowEditorProps {
    rows: { [path: string]: SrRow };
    selected?: string;
}
export const TemplateRowEditor: React.FunctionComponent<TemplateRowEditorProps> = props => {
    let row: SrRow | undefined = undefined;
    if (props.rows && props.selected) {
        row = props.rows[props.selected];
    }
    const rows = row ? [
        { name: 'Value Type', description: row.valueType },
        { name: 'Relationship Type', description: row.relationshipType },
        { name: 'Concept Name', description: row.concept?.getFullString() },
        { name: 'Value Multiplicity', description: row.valueMultiplicity.toString() },
        { name: 'Requirement Type', description: row.requirementType },
        { name: 'Value set constraint', description: row.valueSetConstraint?.getFullString() },
    ] : [];
    return (
        <Box>
            <h2>Row Editor</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={`${row.description}-${index}`}>
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell>
                                    <TextField defaultValue={row.description}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
};
