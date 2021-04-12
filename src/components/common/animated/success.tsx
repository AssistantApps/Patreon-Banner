import React from 'react';
import Lottie from 'react-lottie';
import classNames from 'classnames';

import animationData from './lottie/success.json';
import { defaultLottieOptions } from '../../../constants/lottie';

interface IProps {
    classNames: string;
}
export const SuccessAnimated: React.FC<IProps> = (props: IProps) => {
    return (
        <div className={classNames('lottie', props.classNames)}>
            <Lottie
                options={defaultLottieOptions(animationData)}
            />
        </div>
    );
}