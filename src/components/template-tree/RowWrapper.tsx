import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { ContextGroup, ISrRow, SrRow, ValueType } from '../../utils/dicom/srcm';
import { Box, createStyles, FormControl, Select, TextField, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CodedEntry } from '../../utils/dicom/srom';
import { CodedEntryEditor } from './CodedEntryEditor';
import { getCodesFromContextGroup, getTemplateByTid } from '../../services/terminology-service';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CodeIcon from '@material-ui/icons/Code';
import LinkIcon from '@material-ui/icons/Link';
import { Draft } from 'immer';

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
        },
        onDropHover: {
            backgroundColor: "pink",
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

const droppable = (ev: React.DragEvent<HTMLElement>, valueType: ValueType) => {
    return ev.dataTransfer.types.find(type => type === "valuetype") !== undefined ||
        (ev.dataTransfer.types.find(type => type === "template.tid") !== undefined
            && valueType === ValueType.include
        );
};

interface LabelWrapperProps extends RowWrapperProps {
    bodyBlock: JSX.Element;
    childrenBlock?: JSX.Element | JSX.Element[];
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
    })(props.valueType);

    const classes = useStyles();
    let className = classes.parentBox;

    const [hover, setHover] = useState<number>(0);
    if (hover > 0) {
        className += ` ${classes.onDropHover}`;
    }

    return (
        <Box
            flexDirection="column"
            flexWrap="wrap"
            className={classes.parentBox}
            onClick={ev => toggleSelected(ev)}
        >
            <Box
                flexWrap="wrap"
                className={className}
                style={{ alignItems: "center" }}
                bgcolor={props.selected === props.path ? "primary.light" : ""}
                onDragEnter={(ev) => {
                    if (droppable(ev, props.valueType)) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        setHover(hover + 1);
                    }
                }}
                onDragOver={(ev) => {
                    if (droppable(ev, props.valueType)) {
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                }}
                onDragLeave={(ev) => {
                    if (droppable(ev, props.valueType)) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        setHover(hover - 1);
                    }
                }}
                onDrop={(ev) => {
                    if (droppable(ev, props.valueType)) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        setHover(0);
                        if (ev.dataTransfer.getData("valuetype")) {
                            props.addChildRow(props.path, ev.dataTransfer.getData("valuetype") as ValueType);
                        } else if (ev.dataTransfer.getData("template.tid")) {
                            const tid = parseInt(ev.dataTransfer.getData("template.tid"));
                            getTemplateByTid(tid).toPromise().then(template => {
                                if (template) {
                                    props.updateRows(draft => {
                                        draft[props.path] = draft[props.path].setConcept(template);
                                    });
                                }
                            })
                        }
                    }
                }}
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
                {props.bodyBlock &&
                <Box
                    minWidth="300px"
                    m={1}
                    flexWrap="nowrap"
                    flex={1}
                    className={classes.parentBox}
                >
                    {props.bodyBlock}
                </Box>}
            </Box>
            {props.childrenBlock &&
            <Box ml={2} flexDirection="column" flexWrap="nowrap" className={classes.parentBox}>
                {props.childrenBlock}
            </Box>}
        </Box>
    );
};


export interface RowWrapperProps extends ISrRow {
    path: string;

    selected: string | undefined;
    setSelected: Dispatch<SetStateAction<string | undefined>>;
    addChildRow: (path: string, valueType: ValueType) => void;
    updateRows: (f: (draft: Draft<{ [path: string]: SrRow }>) => void) => void;

    rows: { [path: string]: SrRow };
    link: { [path: string]: string[] };
}
export const RowWrapper: React.FunctionComponent<RowWrapperProps> = props => {
    const children = props.link[props.path].map(childPath => {
        const childRow = props.rows[childPath];
        return (
            <RowWrapper
                {...props}
                {...childRow}
                key={childPath}
                path={childPath}
            />
        );
    });

    switch (props.valueType) {
        case ValueType.container: {
            return (
                <LabelWrapper
                    {...props}
                    bodyBlock={(<Box/>)}
                    childrenBlock={children}
                />
            );
        }
        case ValueType.code: {
            return (
                <LabelWrapper
                    {...props}
                    bodyBlock={(<CodedEntrySelect valueSetConstraint={props.valueSetConstraint}/>)}
                    childrenBlock={children}
                />
            );
        }
        case ValueType.include: {
            return (
                <LabelWrapper
                    {...props}
                    bodyBlock={(<Box/>)}
                    childrenBlock={children}
                />
            );
        }
        case ValueType.text: {
            return (
                <LabelWrapper
                    {...props}
                    bodyBlock={(<TextField/>)}
                    childrenBlock={children}
                />
            );
        }
        default: {
            return (
                <LabelWrapper
                    {...props}
                    bodyBlock={(<React.Fragment>Unknown value type: {props.valueType}</React.Fragment>)}
                />
            );
        }
    }
};
