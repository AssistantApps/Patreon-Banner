type NumberToErrorMessageMap = {
    [code: number]: string
};

export const ErrorMessages: NumberToErrorMessageMap = {
    100: 'An error has occurred. This has been logged and hopefully one of the robots will fix it soon. If you are feeling lucky, please try again',
    440: 'An error occurred on the server, this is most likely not your fault. Please contact support with the time this issue occurred so that we can trace what went wrong and get this issue resolved as soo as possible for you and anyone else that may encounter this issue.',
    441: 'Twitch Authentication Failed. Please try again',
    442: 'Patreon Authentication Failed. This can happen when you have not granted the Patreon Banner access to your Patreon Campaign. This access is required to fetch the list of Patrons from your account. Please try again',
}