import { errorMessageSeperator } from "../constants/validation";
import { defaultSuccessResult, Result } from "../contracts/results/ResultWithValue";

interface IProps {
    errorMessage: string;
    defaultErrorMessageLength: number;
}

export const validationObjFromErrorMessage = (props: IProps): Result => {

    if (props.errorMessage.length > props.defaultErrorMessageLength) {
        return {
            isSuccess: false,
            errorMessage: props.errorMessage,
        }
    }

    return {
        isSuccess: true,
        errorMessage: '',
    }
}



export const combineValidationResults = (...results: Result[]) => {
    if (results.length < 1) return defaultSuccessResult;

    let combined = defaultSuccessResult;
    for (const result of results) {
        if (!result.isSuccess) {
            combined = {
                isSuccess: false,
                errorMessage: combined.errorMessage + (combined.errorMessage.length > 5 ? errorMessageSeperator : '') + result.errorMessage,
            }
        }
    }
    return { ...combined };
};