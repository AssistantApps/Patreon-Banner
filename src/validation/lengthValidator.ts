import { Result } from "../contracts/results/ResultWithValue";
import { validationObjFromErrorMessage } from "./validationBase";

export interface ILengthValidationProps {
    input: string;
    inputName?: string;
    minLength: number;
    maxLength: number;
}

export const lengthValidation = (props: ILengthValidationProps): Result => {
    let errorMessage = '';
    if (props.inputName != null) errorMessage = `${props.inputName}: `;
    const defaultErrorMessageLength = errorMessage.length;

    if ((props.input?.length ?? 0) < props.minLength) errorMessage += 'Text length is too short';
    if ((props.input?.length ?? 0) > props.maxLength) errorMessage += 'Text length is too long';

    return validationObjFromErrorMessage({
        errorMessage: errorMessage,
        defaultErrorMessageLength: defaultErrorMessageLength,
    });
}