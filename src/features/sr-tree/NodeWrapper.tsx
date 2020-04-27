import React from 'react';
import { CodeNode, ContainerNode, ImageNode, Node, NumericNode, PNameNode, TextNode } from '../../utils/dicom/srom';
import { DcmContainer } from './DcmContainerNode';
import { DcmCode } from './DcmCodeNode';
import { DcmText } from './DcmTextNode';
import { DcmImage } from './DcmImageNode';
import { DcmNum } from './DcmNumNode';
import { DcmPName } from './DcmPNameNode';

interface NodeProps {
    node: Node;
}

export const DcmNodeWrapper: React.FunctionComponent<NodeProps> = props => {
    switch (props.node.getNodeType()) {
        case 'CONTAINER': {
            return (
                <DcmContainer node={props.node as ContainerNode}/>
            );
        }
        case 'CODE': {
            return (
                <DcmCode node={props.node as CodeNode}/>
            );
        }
        case 'TEXT': {
            return (
                <DcmText node={props.node as TextNode}/>
            );
        }
        case 'IMAGE': {
            return (
                <DcmImage node={props.node as ImageNode}/>
            );
        }
        case 'NUM': {
            return (
                <DcmNum node={props.node as NumericNode}/>
            );
        }
        case 'PNAME': {
            return (
                <DcmPName node={props.node as PNameNode}/>
            );
        }
        default: {
            return (
                <React.Fragment>Unknown node type {props.node.getNodeType()}</React.Fragment>
            );
        }
    }
};
