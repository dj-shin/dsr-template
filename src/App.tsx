import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import * as xml from './utils/dicom/xml';
import { ContainerNode } from './utils/dicom/srom';
import { DcmNodeWrapper } from './components/sr-tree/NodeWrapper';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { lightBlue, indigo } from '@material-ui/core/colors';
import { AppBar, Box, Tab, Tabs } from '@material-ui/core';
import { TemplateTreeView } from './components/TemplateTreeView';
import { TemplateParameterTable } from './components/TemplateParameterTable';
import { ValueTypeList } from './components/ValueTypeList';
import { TemplateRowEditor } from './components/TemplateRowEditor';
import { TemplateList } from './components/TemplateList';
import {
    measurementReport,
    RequirementType,
    SrRow,
    ValueType
} from './utils/dicom/srcm';
import { RowWrapper } from './components/template-tree/RowWrapper';
import { useImmer } from 'use-immer';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FunctionComponent<TabPanelProps> = props => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
};

export const rootPath = 'ROOT';
const theme = createMuiTheme({
    palette: {
        primary: lightBlue,
        secondary: indigo,
    },
    typography: {
        subtitle1: {
            fontWeight: "bold",
        },
        body1: {
            '@media (max-width:600px)': {
                fontSize: '0.8rem',
            }
        }
    }
});
function App() {
    const [node, setNode] = useState<ContainerNode | null>(null);
    useEffect(() => {
        setNode(xml.test() as ContainerNode);
    }, []);

    const [selected, setSelected] = useState<string | undefined>(undefined);
    const addChildRow = (path: string, valueType: ValueType) => {
        const newRow = new SrRow(
            undefined,
            valueType,
            undefined,
            [1, 1],
            RequirementType.mandatory,
            [],
        );
        const newPath = `${path}.${link[path].length + 1}`;
        updateRow(draft => {
            draft[newPath] = newRow;
        });
        updateLink(draft => {
            draft[path].push(newPath);
            draft[newPath] = [];
        });
    };

    const [rows, updateRow] = useImmer<{ [path: string]: SrRow }>({});
    const [link, updateLink] = useImmer<{ [path: string]: string[] }>({});
    const addSrRow = useCallback((row: SrRow, path: string) => {
        const childrenPaths = row.children.map((child, index) => `${path}.${(index + 1)}`);
        updateRow(draft => {
            draft[path] = row;
        });
        updateLink(draft => {
            draft[path] = childrenPaths;
        });
        row.children.forEach((child, index) => {
            addSrRow(child, `${path}.${index + 1}`);
        });
    }, [updateLink, updateRow]);

    useEffect(() => {
        const rows = measurementReport.rows;
        updateLink(draft => {
            draft[rootPath] = rows.map((row, index) => `${index + 1}`);
        })
        rows.forEach((row, index) => addSrRow(row, `${index + 1}`));
    }, [addSrRow, updateLink]);

    const [value, setValue] = useState(0);
    const handleTabChanged = useCallback((event: any, newValue: number) => {
        setValue(newValue);
    }, []);

    const viewer = (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleTabChanged}>
                    <Tab label="Editor"/>
                    <Tab label="Viewer"/>
                </Tabs>
            </AppBar>
            <TabPanel index={0} value={value}>
                <form className="App">
                    <Box display="flex" flexDirection="column" style={{ overflow: "auto" }}>
                        {(link && link[rootPath]) && link[rootPath].map(path => (
                            <RowWrapper
                                key={path}
                                selected={selected}
                                setSelected={setSelected}
                                addChildRow={addChildRow}
                                path={path}
                                rows={rows}
                                link={link}
                            />
                        ))}
                    </Box>
                </form>
            </TabPanel>
            <TabPanel index={1} value={value}>
                <form className="App">
                    {node &&
                    <Box display="flex" flexDirection="column" style={{ overflow: "auto" }}>
                        <DcmNodeWrapper path="1" node={node} selected={selected} setSelected={setSelected}/>
                    </Box>
                    }
                </form>
            </TabPanel>
        </div>
    );
    return (
        <ThemeProvider theme={theme}>
            <Box display="flex" height="100%" flexDirection="row">
                <Box width="300px" display="flex" flexDirection="column" borderRight={1}>
                    <Box borderBottom={1} height="50%" style={{ overflow: "auto" }}>
                        <TemplateParameterTable/>
                    </Box>
                    <Box height="50%" style={{ overflow: "auto" }}>
                        {(rows && link && link[rootPath]) && <TemplateTreeView rows={rows} link={link}/>}
                    </Box>
                </Box>
                <Box flexGrow={10} display="flex" flexDirection="column">
                    <Box>
                        <ValueTypeList/>
                    </Box>
                    <Box style={{ overflow: "auto" }}>
                        {viewer}
                    </Box>
                </Box>
                <Box width="500px" borderLeft={1} display="flex" flexDirection="column">
                    <Box borderBottom={1} height="50%" style={{ overflow: "auto" }}>
                        <TemplateList/>
                    </Box>
                    <Box height="50%" style={{ overflow: "auto" }}>
                        <TemplateRowEditor rows={rows} selected={selected}/>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
