import { TwitchConfigViewModel } from "../contracts/generated/ViewModel/twitchConfigViewModel";

export const apiPatronOAuthClientId = 'ZpWkiLDiGsMmBM7nmSgr60SHrF0fV-jlbFmkt1d2Uy04DcgXIOUebxrKCeIO4S1G';
export const apiPatronOAuthResponseUrl = 'https://71e898d6ea0f.ngrok.io/OAuth/Patreon';
export const patronOAuthUrl = (state: TwitchConfigViewModel) => `https://www.patreon.com/oauth2/authorize?response_type=code` +
    `&client_id=${apiPatronOAuthClientId}` +
    `&redirect_uri=${apiPatronOAuthResponseUrl}` +
    // `&scope=pledges-to-me` +
    `&scope=identity campaigns campaigns.members` +
    `&state=${encodeURI(JSON.stringify(state))}`;