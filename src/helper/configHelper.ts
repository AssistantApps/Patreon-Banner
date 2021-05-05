declare global {
    interface Window {
        config: any;
        Twitch: any
        registration: any
    }
}

export class Config {
    static apiUrl = 'apiUrl';
}

export const getApi = () => getConfig('apiUrl') ?? '';
export const getApp = () => getConfig('appUrl') ?? '';
export const getConsoleLogDebug = () => getConfig('consoleLogDebug') ?? false;
export const getAnalytics = () => getConfig('googleAnalyticsEnabled') ?? false;

export const getConfig = (property: string) => getEntireConfig()?.[property] ?? '';
export const getSubConfig = (property: string, subProperty: string) => getEntireConfig()?.[property]?.[subProperty] ?? '';
export const getEntireConfig = () => window.config;

export const getDisplayUrl = (guid: string) => (getApp() != null && guid != null)
    ? `${getApp()}/display.html?guid=${guid}`
    : '';
