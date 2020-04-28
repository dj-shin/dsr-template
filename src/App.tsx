import React from 'react';
import './App.css';
import * as xml from './utils/dicom/xml';
import { ContainerNode } from './utils/dicom/srom';
import { DcmNodeWrapper } from './features/sr-tree/NodeWrapper';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blueGrey, lightBlue } from '@material-ui/core/colors';

function App() {
    const node: ContainerNode = xml.test() as ContainerNode;
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
    return (
        <ThemeProvider theme={theme}>
            <form className="App">
                <DcmNodeWrapper node={node}/>
            </form>
        </ThemeProvider>
    );
}

export default App;
