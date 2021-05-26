
import React from 'react';
import classNames from 'classnames';

interface IProps {
    classNames?: string;
}

export const Lock: React.FC<IProps> = (props: IProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={classNames('lock', props.classNames)}>
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
        </svg>
    );
}