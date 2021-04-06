import { Result } from "../contracts/results/ResultWithValue";
import { validationObjFromErrorMessage } from "./validationBase";

export interface INumericValidationProps {
    input: string;
    inputName?: string;
}

export const numericOnlyValidation = (props: INumericValidationProps): Result => {
    let errorMessage = '';
    if (props.inputName != null) errorMessage = `${props.inputName}: `;
    const defaultErrorMessageLength = errorMessage.length;

    let constainsNan = false;
    for (const inputChar of props.input) {
        if (isNaN(inputChar as any)) {
            constainsNan = true;
            break;
        }
    }

    if (constainsNan) errorMessage += 'Only numbers (0 - 9) allowed'

    return validationObjFromErrorMessage({
        errorMessage: errorMessage,
        defaultErrorMessageLength: defaultErrorMessageLength,
    });
}