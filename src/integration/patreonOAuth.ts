import { patreonApiOAuthUrl, apiPatronOAuthClientId } from "../constants/patreon";
import { TwitchConfigViewModel } from "../contracts/generated/ViewModel/twitchConfigViewModel";

export const apiPatronOAuthResponseUrl = `${window.config.apiUrl}/OAuth/Patreon`;
export const patronOAuthUrl = (state: TwitchConfigViewModel) => `${patreonApiOAuthUrl}?response_type=code` +
    `&client_id=${apiPatronOAuthClientId}` +
    `&redirect_uri=${apiPatronOAuthResponseUrl}` +
    `&scope=identity campaigns campaigns.members` +
    `&state=${encodeURI(JSON.stringify(state))}`;