import { DesignPalette } from '../constants/designPalette';
import { PatreonSettingsViewModel } from '../contracts/generated/ViewModel/patreonSettingsViewModel';

export const getPanelSettings = (settings: PatreonSettingsViewModel) => {
    return {
        foregroundColour: settings.panelForegroundColour ?? DesignPalette.panelForegroundColour,
        backgroundColour: settings.panelBackgroundColour ?? DesignPalette.panelBackgroundColour,
        backgroundOpacity: settings.panelBackgroundOpacity ?? DesignPalette.panelBackgroundOpacity,
        verticalListSpeed: settings.panelVerticalListSpeed ?? DesignPalette.panelVerticalListSpeedDefault,
        isProfilePicRounded: settings.panelIsProfilePicRounded ?? DesignPalette.panelIsProfilePicRounded,
        profilePicRoundedValue: settings.panelProfilePicRoundedValue ?? DesignPalette.panelProfilePicRoundedValue,
    };
}