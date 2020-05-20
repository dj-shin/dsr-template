import React from 'react';
import { TreeItem, TreeView } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronIcon from '@material-ui/icons/ChevronRight';
import { SrRow } from '../utils/dicom/srcm';
import { rootPath } from '../App';

interface TemplateTreeViewProps {
    rows: { [path: string]: SrRow };
    link: { [path: string]: string[] };
}
export const TemplateTreeView: React.FunctionComponent<TemplateTreeViewProps> = props => {
    const treeGenerator = (row: SrRow, path: string) => {
        const children = props.link[path].map(childPath => treeGenerator(props.rows[childPath], childPath));
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
                {props.link[rootPath].map(path => treeGenerator(props.rows[path], path))}
            </TreeView>
        </div>
    );
};
