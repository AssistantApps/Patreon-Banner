
import { Result } from '../../contracts/results/ResultWithValue';
import { lengthValidation } from '../../validation/lengthValidator';
import { numericOnlyValidation } from '../../validation/numericOnlyValidator';
import { errorMessageSeperator } from '../../constants/validation';
import { IConfigPagePresenterProps } from './configPagePresenter';
import { combineValidationResults } from '../../validation/validationBase';

export const isAccessTokenValid = (localProps: IConfigPagePresenterProps, withoutPrefix: boolean = false): Result => {
    return lengthValidation({
        inputName: withoutPrefix ? undefined : 'Access Token',
        input: localProps.accessToken,
        minLength: 12,
        maxLength: 40
    });
}

export const isCampaignIdValid = (localProps: IConfigPagePresenterProps, withoutPrefix: boolean = false): Result => {
    const lengthResult = lengthValidation({
        inputName: withoutPrefix ? undefined : 'Campaign Id',
        input: localProps.campaignId,
        minLength: 5,
        maxLength: 7
    });
    const numericResult = numericOnlyValidation({
        inputName: withoutPrefix ? undefined : 'Campaign Id',
        input: localProps.campaignId,
    });
    return combineValidationResults(lengthResult, numericResult);
}

export const isFormValid = (localProps: IConfigPagePresenterProps): Result => {
    const isAccessTokenValidResult = isAccessTokenValid(localProps);
    const isCampaignIdValidResult = isCampaignIdValid(localProps);

    const errorMessages: Array<string> = [];

    if (isAccessTokenValidResult.isSuccess === false) errorMessages.push(isAccessTokenValidResult.errorMessage);
    if (isCampaignIdValidResult.isSuccess === false) errorMessages.push(isCampaignIdValidResult.errorMessage);

    if (errorMessages.length > 0) {
        return {
            isSuccess: false,
            errorMessage: errorMessages.join(errorMessageSeperator),
        }
    }

    return {
        isSuccess: true,
        errorMessage: '',
    }
}
