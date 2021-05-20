import { PatreonSettingsViewModel } from '../contracts/generated/ViewModel/patreonSettingsViewModel';

export const getPanelSettings = (settings: PatreonSettingsViewModel) => {
    return {
        foregroundColour: settings.panelForegroundColour,
        backgroundColour: settings.panelBackgroundColour,
        backgroundOpacity: settings.panelBackgroundOpacity,
        verticalListSpeed: settings.panelVerticalListSpeed,
        isProfilePicRounded: settings.panelIsProfilePicRounded,
        profilePicRoundedValue: settings.panelProfilePicRoundedValue,
    };
}