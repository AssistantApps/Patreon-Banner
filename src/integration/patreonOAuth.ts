import { patreonApiOAuthUrl } from "../constants/patreon";
import { authTokenFromServer } from "../constants/route";
import { TwitchConfigViewModel } from "../contracts/generated/ViewModel/twitchConfigViewModel";
import { getApi, getApp, getApiPatronOAuthClientId } from "../helper/configHelper";

export const apiPatronOAuthResponseForTwitchUrl = () => `${getApi()}/OAuth/PatreonFromTwitch`;
export const patronOAuthUrlForTwitch = (state: TwitchConfigViewModel) => `${patreonApiOAuthUrl}?response_type=code` +
    `&client_id=${getApiPatronOAuthClientId()}` +
    `&redirect_uri=${apiPatronOAuthResponseForTwitchUrl()}` +
    `&scope=identity campaigns campaigns.members` +
    `&state=${encodeURI(JSON.stringify(state))}`;

export const apiPatronOAuthResponseUrl = () => `${getApp()}${authTokenFromServer}`;
export const patronOAuthUrl = () => `${patreonApiOAuthUrl}?response_type=code` +
    `&client_id=${getApiPatronOAuthClientId()}` +
    `&redirect_uri=${apiPatronOAuthResponseUrl()}` +
    `&scope=identity campaigns campaigns.members`;