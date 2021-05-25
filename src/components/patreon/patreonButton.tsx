import React from 'react';
import classNames from 'classnames';
import { BasicLink } from '../core/link';

export interface IPatreonButtonProps {
    text?: string;
    link?: string;
    classNames?: string;
    onClick?: () => void;
}

export const PatreonButton: React.FC<IPatreonButtonProps> = (props: IPatreonButtonProps) => {
    const text = props.text ?? 'Login with Patreon';
    const displayAsLink = (props?.link != null);

    const child = (<div className="text">{text}</div>);

    if (displayAsLink) {
        return (
            <BasicLink href={props.link ?? ''}
                additionalClassNames={classNames('patreon-btn button', props.classNames)}>
                {child}
            </BasicLink>
        );
    }

    return (
        <button color="primary" type="submit"
            className={classNames('patreon-btn', props.classNames)}
            onClick={() => props?.onClick?.()}>{child}</button>
    );
}