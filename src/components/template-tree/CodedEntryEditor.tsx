import React, { ChangeEvent, useEffect, useState } from 'react';
import {
    Box,
    createStyles,
    FormControl,
    InputLabel,
    Select,
    TextField,
    Theme,
    Tooltip,
    Typography
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { CodedConceptConstraint, ISrRow, SrRow, ValueType } from '../../utils/dicom/srcm';
import {
    getCodeList,
    getCodesFromContextGroup,
    getContextGroupList,
    getTemplateList
} from '../../services/terminology-service';
import { combineLatest, Observable } from 'rxjs';
import { CodedEntry } from '../../utils/dicom/srom';
import { Draft } from 'immer';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        anonymousLabel: {
            border: '1px dashed',
        },
        tooltip: {
            fontSize: theme.typography.pxToRem(15),
        },
        clipLabel: {
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "100%",
        }
    }),
);

enum EditorState {
    empty,
    searching,
    selected,
}

interface CodedEntryEditorProps extends ISrRow {
    path: string;
    selected: string | undefined;
    updateRows: (f: (draft: Draft<{ [path: string]: SrRow }>) => void) => void;
}
export const CodedEntryEditor: React.FunctionComponent<CodedEntryEditorProps> = props => {
    const conceptName = props.concept;
    const [editorState, setEditorState] = useState(conceptName === undefined ? EditorState.empty : EditorState.selected);
    const classes = useStyles();

    const [codes, setCodes] = useState<CodedConceptConstraint[]>([]);
    const [options, setOptions] = useState<CodedEntry[]>([]);

    useEffect(() => {
        const sources: Observable<CodedConceptConstraint[]>[] = [];
        switch (props.valueType) {
            case ValueType.include: {
                sources.push(getTemplateList());
                break;
            }
            default: {
                sources.push(getContextGroupList());
                sources.push(getCodeList());
                break;
            }
        }
        const subscription = combineLatest(sources).subscribe((args) => {
            const flat = args.reduce((acc, e) => [...acc, ...e], []);
            setCodes(flat);
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [props.valueType]);

    useEffect(() => {
        if (conceptName) {
            const subscription = getCodesFromContextGroup(conceptName).subscribe(setOptions);
            return () => {
                subscription.unsubscribe();
            };
        }
    }, [conceptName])

    switch (editorState) {
        case EditorState.empty: {
            return (
                <Box
                    width="100%"
                    flex={1}
                    onDoubleClick={(ev) => {
                        ev.preventDefault();
                        setEditorState(EditorState.searching);
                    }}
                    className={classes.anonymousLabel}
                    color={props.selected === props.path ? "primary.contrastText" : ""}
                >
                    Anonymous {props.valueType}
                </Box>
            );
        }
        case EditorState.searching: {
            return (
                <Box width="100%" flex={1}>
                    <Autocomplete
                        options={codes}
                        getOptionLabel={(option: CodedConceptConstraint) => option.getShortString()}
                        defaultValue={conceptName || undefined}
                        renderOption={(option) => (
                            <Tooltip
                                title={
                                    <Typography
                                        className={classes.tooltip}
                                    >
                                        {option.getFullString()}
                                    </Typography>
                                }
                            >
                                <Box
                                    textOverflow="ellipsis"
                                    overflow="hidden"
                                    whiteSpace="nowrap"
                                    color={props.selected === props.path ? "primary.contrastText" : ""}
                                >
                                    {option.getShortString()}
                                </Box>
                            </Tooltip>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search coded entry"
                            />
                        )}
                        onBlur={() => setEditorState(conceptName ? EditorState.selected : EditorState.empty)}
                        onChange={(ev: ChangeEvent<{}>, value: CodedConceptConstraint | null) => {
                            props.updateRows(draft => {
                                draft[props.path].concept = value || undefined;
                            });
                            setEditorState(value !== null ? EditorState.selected : EditorState.empty);
                        }}
                    />
                </Box>
            );
        }
        case EditorState.selected: {
            const optionList = options.map((option, index) => (
                <option key={option.getShortString()} value={index}>{option.getShortString()}</option>
            ));
            return (
                <React.Fragment>
                    {conceptName &&
                    <Box
                        flex={1}
                        width="100%"
                        onDoubleClick={(ev) => {
                            ev.preventDefault();
                            setEditorState(EditorState.searching);
                        }}
                        color={props.selected === props.path ? "primary.contrastText" : ""}
                    >
                        {conceptName.isSingleValue() ?
                            conceptName.getShortString() :
                            <FormControl>
                                <InputLabel id={`select-label-${props.path}`} className={classes.clipLabel}>{conceptName.getShortString()}</InputLabel>
                                <Select labelId={`select-label-${props.path}`} id={`select-${props.path}`} value="" native>
                                    <option value=""/>
                                    {optionList}
                                </Select>
                            </FormControl>
                        }
                    </Box>}
                </React.Fragment>
            );
        }
    }
};
