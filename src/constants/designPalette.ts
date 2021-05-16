import { PatreonSettingsViewModel } from "../contracts/generated/ViewModel/patreonSettingsViewModel";
import { DisplayType } from "./enum/displayType";

const patronForegroundColours = [
    '#FFFFFF',
    '#000000',
];

const patronBackgroundColours = [
    '#000000',
    '#D32F2F',
    '#303F9F',
    '#388E3C',
];

export const DesignPalette = {
    foregroundDefault: patronForegroundColours[0],
    foregroundOptions: patronForegroundColours,
    //
    backgroundDefault: patronBackgroundColours[0],
    backgroundOptions: patronBackgroundColours,
    //
    backgroundOpacityMin: 0,
    backgroundOpacityMax: 100,
    backgroundOpacityDefault: 30,
    //
    marqueSpeedDefault: 4,
    marqueSpeedTicks: [
        { value: 1, label: 'very very slow' }, { value: 2, label: 'very slow' }, { value: 3, label: 'slow' },
        { value: 4, label: 'default' },
        { value: 5, realValue: 8, label: 'fast' }, { value: 6, realValue: 14, label: 'very fast' }, { value: 7, realValue: 20, label: 'very very fast' }
    ],
    //
    verticalListSpeedDefault: 6,
    panelVerticalListSpeedDefault: 6,
    verticalListSpeedTicks: [
        { value: 1, realValue: 250, label: '250ms' }, { value: 2, realValue: 500, label: '500ms' },
        { value: 4, realValue: 1000, label: '1000ms' }, { value: 6, realValue: 1500, label: 'default' },
        { value: 8, realValue: 2000, label: '2000ms' }, { value: 12, realValue: 3000, label: '3000ms' },
    ],
    //
    oneAtATimeSpeedDefault: 2,
    oneAtATimeSpeedTicks: [
        { value: 1, realValue: 500, label: '1s' }, { value: 2, realValue: 750, label: 'default' },
        { value: 3, realValue: 1000, label: '2s' }, { value: 4, realValue: 1250, label: '2.5s' },
        { value: 5, realValue: 1500, label: '3s' }, { value: 6, realValue: 1750, label: '.35s' }, { value: 7, realValue: 2000, label: '4s' },
    ],
    //
    profilePicRoundedValue: 25,
}

export const DefaultPatreonSettings: PatreonSettingsViewModel = {
    displayType: DisplayType.Marquee,
    foregroundColour: DesignPalette.foregroundDefault,
    backgroundColour: DesignPalette.backgroundDefault,
    backgroundOpacity: DesignPalette.backgroundOpacityDefault,
    marqueSpeed: DesignPalette.marqueSpeedDefault,
    verticalListSpeed: DesignPalette.verticalListSpeedDefault,
    oneAtATimeSpeed: DesignPalette.oneAtATimeSpeedDefault,
    panelVerticalListSpeed: DesignPalette.panelVerticalListSpeedDefault,
    isProfilePicRounded: false,
    profilePicRoundedValue: DesignPalette.profilePicRoundedValue,

    guid: '',
    userGuid: '',
    lastModifiedDate: new Date(),
}