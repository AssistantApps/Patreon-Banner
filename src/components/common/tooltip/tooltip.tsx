
import React, { ReactNode } from 'react';
import { Tooltip } from 'react-tippy';

interface IProps {
    children?: ReactNode;
    message: string;
}

const tooltipInfoIcon = (
    <i className="icon-info icon info"></i>
);

export const DefaultTooltip: React.FC<IProps> = (props: IProps) => {
    return (
        <Tooltip
            title={props.message}
            position="top-end"
            trigger="mouseenter"
        >
            {props.children ?? tooltipInfoIcon}
        </Tooltip>
    );
}