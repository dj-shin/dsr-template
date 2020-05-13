import React, { useEffect, useState } from 'react';
import './App.css';
import * as xml from './utils/dicom/xml';
import { ContainerNode } from './utils/dicom/srom';
import { DcmNodeWrapper } from './components/sr-tree/NodeWrapper';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blueGrey, lightBlue } from '@material-ui/core/colors';
import { AppBar, Box, Tab, Tabs } from '@material-ui/core';
import { TemplateTreeView } from './components/TemplateTreeView';
import { TemplateParameterTable } from './components/TemplateParameterTable';
import { ValueTypeList } from './components/ValueTypeList';
import { TemplateRowEditor } from './components/TemplateRowEditor';
import { TemplateList } from './components/TemplateList';

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

function App() {
    const [node, setNode] = useState<ContainerNode | null>(null);
    useEffect(() => {
        setNode(xml.test() as ContainerNode);
    }, []);
    const [selected, setSelected] = useState<string | undefined>(undefined);

    const theme = createMuiTheme({
        palette: {
            primary: lightBlue,
            secondary: blueGrey,
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

    const [value, setValue] = React.useState(0);
    const handleTabChanged = (event: any, newValue: number) => {
        setValue(newValue);
    };

    const viewer = (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleTabChanged}>
                    <Tab label="Viewer"/>
                </Tabs>
            </AppBar>
            <TabPanel index={0} value={value}>
                <form className="App">
                    {node &&
                        <Box style={{ overflow: "auto" }}>
                            <DcmNodeWrapper node={node} selected={selected} setSelected={setSelected} path="1"/>
                            <DcmNodeWrapper node={node} selected={selected} setSelected={setSelected} path="1"/>
                            <DcmNodeWrapper node={node} selected={selected} setSelected={setSelected} path="1"/>
                            <DcmNodeWrapper node={node} selected={selected} setSelected={setSelected} path="1"/>
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
                        <TemplateTreeView/>
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
                        <TemplateRowEditor/>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
