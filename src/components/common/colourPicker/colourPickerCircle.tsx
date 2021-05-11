import classNames from 'classnames';
import React from 'react';

import { Checkmark } from '../svg/checkmark';
import { handleHex } from '../../../helper/colourHelper';

interface IProps {
    colourHex: string;
    isActive: boolean;
    onClick?: () => void;
}

export const ColourPickerCircle: React.FC<IProps> = (props: IProps) => {

    let localHex = handleHex(props.colourHex);

    const styleObj: any = {
        marginTop: '0.25em',
        marginRight: '0.25em',
        backgroundColor: localHex,
    };
    if (props.isActive) {
        styleObj.border = 'unset';
    }

    const classNamesObj = {
        'pointer': props.onClick != null,
        'active': props.isActive,
    };

    const onClick = () => {
        if (props.isActive) return;
        props?.onClick?.();
    }

    return (
        <label
            className={classNames('colour-bubble', classNamesObj)}
            style={styleObj}
            onClick={onClick}
            draggable={false}>
            {
                props.isActive && <Checkmark />
            }
        </label>
    );
}