import React from 'react';
import { errorMessageSeperator } from '../../../constants/validation';
import { Result } from '../../../contracts/results/ResultWithValue';

interface IProps extends Result {
    htmlFor?: string;
}

export const ErrorLabel: React.FC<IProps> = (props: IProps) => {
    const errorMessages = props.errorMessage.split(errorMessageSeperator) || [];
    if (props.isSuccess || errorMessages.length < 1) return (<span></span>);

    const errorMessageString = errorMessages.join('. ');

    return (
        <label htmlFor={props.htmlFor} className="errors-title" style={{ margin: 0 }}>{errorMessageString}</label>
    );
}