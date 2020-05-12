import React, { Dispatch, SetStateAction } from 'react';
import { CodeNode, ContainerNode, ImageNode, Node, NumericNode, PNameNode, TextNode } from '../../utils/dicom/srom';
import { DcmContainer } from './DcmContainerNode';
import { DcmCode } from './DcmCodeNode';
import { DcmText } from './DcmTextNode';
import { DcmImage } from './DcmImageNode';
import { DcmNum } from './DcmNumNode';
import { DcmPName } from './DcmPNameNode';
import { Box } from '@material-ui/core';
import { DcmCodedEntry } from './DcmCodedEntry';

import './DcmNode.css';

export interface NodeProps {
    path: string;
    node: Node;
    selected: string | undefined;
    setSelected: Dispatch<SetStateAction<string | undefined>>;
}

export const DcmNodeWrapper: React.FunctionComponent<NodeProps> = props => {
    const node = props.node;
    const nodeName = node.getNodeName();

    const selected = props.selected === props.path;
    const bgColor = selected ? "primary.light" : "";
    const toggleSelected = () => {
        if (props.selected === props.path) {
            props.setSelected(undefined);
        } else {
            props.setSelected(props.path);
        }
    };
    const children = props.node.children.map((node, idx) => {
        const path = props.path + "." + (idx + 1).toString();
        return (
            <DcmNodeWrapper
                key={path}
                {...props}
                path={path}
                node={node}
            />
        );
    });

    const labelWrapper = (body: any) => (
        <Box display="flex" flexWrap="wrap" flexDirection="row" alignItems="center"
             bgcolor={bgColor}
             flexGrow={1}
        >
            {nodeName &&
            <Box flexGrow={1} mr={1}
                 onClick={toggleSelected}
            >
                <label>
                    <DcmCodedEntry code={nodeName}/>
                </label>
            </Box>}
            {body}
        </Box>
    );

    switch (props.node.getNodeType()) {
        case 'CONTAINER': {
            return (
                <DcmContainer {...props} node={props.node as ContainerNode}>
                    {children}
                </DcmContainer>
            );
        }
        case 'CODE': {
            return labelWrapper(
                <DcmCode node={props.node as CodeNode}>
                    <Box display="flex" flexWrap="wrap" flexDirection="row" alignItems="center"
                         ml={1}
                         bgcolor={bgColor}
                         flexGrow={1}
                    >
                        {children}
                    </Box>
                </DcmCode>
            );
        }
        case 'TEXT': {
            return labelWrapper(
                <DcmText node={props.node as TextNode}/>
            );
        }
        case 'IMAGE': {
            return labelWrapper(
                <DcmImage node={props.node as ImageNode}/>
            );
        }
        case 'NUM': {
            return labelWrapper(
                <DcmNum node={props.node as NumericNode}/>
            );
        }
        case 'PNAME': {
            return labelWrapper(
                <DcmPName node={props.node as PNameNode}/>
            );
        }
        default: {
            return labelWrapper(
                <React.Fragment>Unknown node type {props.node.getNodeType()}</React.Fragment>
            );
        }
    }
};
