import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { ContextGroup, SrRow, ValueType } from '../../utils/dicom/srcm';
import { Box, createStyles, FormControl, Select, TextField, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CodedEntry } from '../../utils/dicom/srom';
import { CodedEntryEditor } from './CodedEntryEditor';
import { getCodesFromContextGroup } from '../../services/terminology-service';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CodeIcon from '@material-ui/icons/Code';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            minWidth: 200,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        parentBox: {
            display: "flex",
            alignItems: "stretch",
            alignContent: "stretch",
        }
    }),
);

interface CodedEntrySelect {
    valueSetConstraint?: ContextGroup;
}
export const CodedEntrySelect: React.FunctionComponent<CodedEntrySelect> = props => {
    const [codeIndex, setCode] = useState<number | null>(null);
    const classes = useStyles();
    const [codes, setCodes] = useState<CodedEntry[]>([]);
    useEffect(() => {
        const subscription = getCodesFromContextGroup(props.valueSetConstraint).subscribe(setCodes);
        return () => {
            subscription.unsubscribe();
        };
    }, [props.valueSetConstraint]);
    const options = codes.map((option, index) => (
        <option key={`${option.getCodeMeaning()}-${index}`} value={index}>{option.getCodeMeaning()}</option>
    ));
    return (
        <FormControl className={classes.formControl}>
            <Select
                native
                value={codeIndex || ''}
                onChange={ev => setCode(ev.target.value as number)}
            >
                {options}
            </Select>
        </FormControl>
    );
};

interface LabelWrapperProps extends RowWrapperProps {
    body: any;
}
const LabelWrapper: React.FunctionComponent<LabelWrapperProps> = props => {
    const toggleSelected = useCallback((ev: React.MouseEvent) => {
        ev.preventDefault();
        ev.stopPropagation();
        if (props.selected === props.path) {
            props.setSelected(undefined);
        } else {
            props.setSelected(props.path);
        }
    }, [props]);

    const icon = ((valueType: ValueType) => {
        switch (valueType) {
            case ValueType.container: {
                return (<AccountTreeIcon/>);
            }
            case ValueType.include: {
                return (<LinkIcon/>);
            }
            case ValueType.code: {
                return (<CodeIcon/>);
            }
            default: {
                return (<TextFieldsIcon/>);
            }
        }
    })(props.row.valueType);
    const classes = useStyles();

    return (
        <Box
            flexDirection="column"
            flexWrap="wrap"
            className={classes.parentBox}
            onClick={ev => toggleSelected(ev)}
        >
            <Box
                flexWrap="wrap"
                className={classes.parentBox}
                style={{ alignItems: "center" }}
                bgcolor={props.selected === props.path ? "primary.light" : ""}
            >
                {icon}
                <Box
                    minWidth="200px"
                    m={1}
                    flexWrap="nowrap"
                    className={classes.parentBox}
                    style={{ alignItems: "center" }}
                >
                    <CodedEntryEditor {...props}/>
                </Box>
                {props.body &&
                <Box
                    minWidth="300px"
                    m={1}
                    flexWrap="nowrap"
                    flex={1}
                    className={classes.parentBox}
                >
                    {props.body}
                </Box>}
            </Box>
            {props.children &&
            <Box ml={2} flexDirection="column" flexWrap="nowrap" className={classes.parentBox}>
                {props.children}
            </Box>}
        </Box>
    );
};


export interface RowWrapperProps {
    path: string;
    row: SrRow;
    selected: string | undefined;
    setSelected: Dispatch<SetStateAction<string | undefined>>;
}
export const RowWrapper: React.FunctionComponent<RowWrapperProps> = props => {
    const row = props.row;

    const children = row.children.map((row, idx) => {
        const path = `${props.path}.${(idx + 1)}`;
        return (
            <RowWrapper
                key={path}
                {...props}
                path={path}
                row={row}
            />
        );
    });

    switch (row.valueType) {
        case ValueType.container: {
            return (
                <LabelWrapper
                    {...props}
                    body={(<Box/>)}
                >
                    {children}
                </LabelWrapper>
            );
        }
        case ValueType.code: {
            return (
                <LabelWrapper
                    {...props}
                    body={(<CodedEntrySelect valueSetConstraint={row.valueSetConstraint}/>)}
                >
                    {children}
                </LabelWrapper>
            );
        }
        case ValueType.include: {
            return (
                <LabelWrapper
                    {...props}
                    body={(<Box/>)}
                >
                    {children}
                </LabelWrapper>
            );
        }
        case ValueType.text: {
            return (
                <LabelWrapper
                    {...props}
                    body={(<TextField/>)}
                >
                    {children}
                </LabelWrapper>
            );
        }
        default: {
            return (
                <LabelWrapper
                    {...props}
                    body={(<React.Fragment>Unknown value type: {row.valueType}</React.Fragment>)}
                />
            );
        }
    }
};
