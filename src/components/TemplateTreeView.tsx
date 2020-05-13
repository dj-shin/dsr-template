import React from 'react';
import { TreeItem, TreeView } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronIcon from '@material-ui/icons/ChevronRight';

interface TemplateTreeViewProps {
}
export const TemplateTreeView: React.FunctionComponent<TemplateTreeViewProps> = props => {
    return (
        <div style={{ overflow: 'auto' }}>
            <h2>Tree View</h2>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronIcon/>}
                defaultExpanded={['1', '2', '3', '4', '5', '6']}
            >
                <TreeItem nodeId="1" label="Imaging Measurement Report">
                    <TreeItem nodeId="2" label="Language of Content Item and Descendants">
                        <TreeItem nodeId="3" label="Country of Language"/>
                    </TreeItem>
                    <TreeItem nodeId="4" label="Person Observer Name"/>
                    <TreeItem nodeId="5" label="Person Observer's Login Name"/>
                    <TreeItem nodeId="6" label="Procedure Reported"/>
                </TreeItem>
            </TreeView>
        </div>
    );
};
