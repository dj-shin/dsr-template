import React from 'react';
import { TreeItem, TreeView } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronIcon from '@material-ui/icons/ChevronRight';
import { SrRow, SrTemplate } from '../utils/dicom/srcm';

interface TemplateTreeViewProps {
    template: SrTemplate;
}
export const TemplateTreeView: React.FunctionComponent<TemplateTreeViewProps> = props => {
    const treeGenerator = (row: SrRow, path: string) => {
        const children = row.children.map((childRow, index) =>
            treeGenerator(childRow, `${path}.${(index + 1).toString()}`)
        );
        return (
            <TreeItem key={path} nodeId={path} label={row.concept?.getShortString()}>
                {children}
            </TreeItem>
        );
    };
    return (
        <div style={{ overflow: 'auto' }}>
            <h2>Tree View</h2>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronIcon/>}
            >
                {props.template.rows.map((row, index) => treeGenerator(row, (index + 1).toString()))}
            </TreeView>
        </div>
    );
};
