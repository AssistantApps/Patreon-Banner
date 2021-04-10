type NumberToErrorMessageMap = {
    [code: number]: string
};

export const ErrorMessages: NumberToErrorMessageMap = {
    100: 'An error has occurred. This has been logged and hopefully one of the robots will fix it soon. If you are feeling lucky, please try again',
    441: 'Twitch Authentication Failed. Please try again',
    442: 'Patreon Authentication Failed. This can happen when you have not granted the Patreon Banner access to your Patreon Campaign. This access is required to fetch the list of Patrons from your account. Please try again',
}