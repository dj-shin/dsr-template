import React, { Dispatch, SetStateAction } from 'react';
import { SrRow, ValueType } from '../../utils/dicom/srcm';
import { Box } from '@material-ui/core';

export interface RowWrapperProps {
    path: string;
    row: SrRow;
    selected: string | undefined;
    setSelected: Dispatch<SetStateAction<string | undefined>>;
}

export const RowWrapper: React.FunctionComponent<RowWrapperProps> = props => {
    const row = props.row;
    const name = row.concept;

    const selected = props.selected === props.path;
    const bgColor = selected ? "primary.light" : "";
    const toggleSelected = () => {
        if (props.selected === props.path) {
            props.setSelected(undefined);
        } else {
            props.setSelected(props.path);
        }
    };
    const children = row.children.map((row, idx) => {
        const path = props.path + "." + (idx + 1).toString();
        return (
            <RowWrapper
                key={path}
                {...props}
                path={path}
                row={row}
            />
        );
    });

    const labelWrapper = (body: any) => (
        <Box display="flex" flexDirection="column"
             bgcolor={bgColor}
             flexGrow={1}
        >
            {name &&
            <Box flexGrow={1} mr={1}
                 onClick={toggleSelected}
            >
                <label>
                    {name.toString()}
                </label>
            </Box>}
            {body}
            {children}
        </Box>
    );

    switch (row.valueType) {
        case ValueType.container: {
            return labelWrapper(
                <Box>
                    container
                </Box>
            )
        }
        case ValueType.code: {
            return labelWrapper(
                <Box>
                    code
                </Box>
            )
        }
        case ValueType.include: {
            return labelWrapper(
                <Box>
                    include
                </Box>
            )
        }
        default: {
            return labelWrapper(
                <React.Fragment>Unknown node type {row.valueType}</React.Fragment>
            );
        }
    }
};
