import React from 'react';
import { errorMessageSeperator } from '../../../constants/validation';
import { Result } from '../../../contracts/results/ResultWithValue';

interface IProps extends Result {
}

export const ErrorMessageList: React.FC<IProps> = (props: IProps) => {
    const errorMessages = props.errorMessage.split(errorMessageSeperator) || [];
    if (props.isSuccess || errorMessages.length < 1) return (<span></span>);

    return (
        <>
            <p className="errors-title mt1">Please fix the following errors:</p>
            <ul className="errors">
                {
                    (props.errorMessage.split(errorMessageSeperator) || []).map((errorString: string) => {
                        return (
                            <li>{errorString}</li>
                        );
                    })
                }
            </ul>
        </>
    );
}