import React from 'react';
import './App.css';
import * as xml from './utils/dicom/xml';
import { ContainerNode } from './utils/dicom/srom';
import { DcmNodeWrapper } from './features/sr-tree/NodeWrapper';

function App() {
  const node: ContainerNode = xml.test() as ContainerNode;
  return (
    <div className="App">
        <DcmNodeWrapper node={node}/>
    </div>
  );
}

export default App;
