import React, { useState } from 'react';
import './App.css';
import * as xml from './utils/dicom/xml';
import { ContainerNode } from './utils/dicom/srom';
import { DcmNodeWrapper } from './components/sr-tree/NodeWrapper';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blueGrey, lightBlue } from '@material-ui/core/colors';
import { AppBar, Box, Tab, Tabs } from '@material-ui/core';

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
    const node: ContainerNode = xml.test() as ContainerNode;
    const [selected, setSelected] = useState<string | undefined>(undefined);

    let theme = createMuiTheme({
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

    const headerStyle = {
        height: "50px",
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
                    <DcmNodeWrapper node={node} selected={selected} setSelected={setSelected} path="1"/>
                    <DcmNodeWrapper node={node} selected={selected} setSelected={setSelected} path="1"/>
                    <DcmNodeWrapper node={node} selected={selected} setSelected={setSelected} path="1"/>
                    <DcmNodeWrapper node={node} selected={selected} setSelected={setSelected} path="1"/>
                </form>
            </TabPanel>
        </div>
    );

    return (
        <ThemeProvider theme={theme}>
            <Box display="flex" height="100%" flexDirection="row">
                <Box minWidth="300px">Left</Box>
                <Box flexGrow={10} display="flex" flexDirection="column">
                    <Box>
                        <header style={headerStyle}>Header</header>
                    </Box>
                    <Box style={{ overflow: "auto" }}>
                        {viewer}
                    </Box>
                </Box>
                <Box minWidth="300px">Right</Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
