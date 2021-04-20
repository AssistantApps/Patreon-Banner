import { patreonApiOAuthUrl, apiPatronOAuthClientId } from "../constants/patreon";
import { TwitchConfigViewModel } from "../contracts/generated/ViewModel/twitchConfigViewModel";
import { getApi } from "../helper/configHelper";

export const apiPatronOAuthResponseForTwitchUrl = () => `${getApi()}/OAuth/PatreonFromTwitch`;
export const patronOAuthUrlForTwitch = (state: TwitchConfigViewModel) => `${patreonApiOAuthUrl}?response_type=code` +
    `&client_id=${apiPatronOAuthClientId}` +
    `&redirect_uri=${apiPatronOAuthResponseForTwitchUrl()}` +
    `&scope=identity campaigns campaigns.members` +
    `&state=${encodeURI(JSON.stringify(state))}`;

export const apiPatronOAuthResponseUrl = () => `${getApi()}/OAuth/Patreon`;
export const patronOAuthUrl = () => `${patreonApiOAuthUrl}?response_type=code` +
    `&client_id=${apiPatronOAuthClientId}` +
    `&redirect_uri=${apiPatronOAuthResponseUrl()}` +
    `&scope=identity campaigns campaigns.members`;