/* Auto Generated */

import { PatreonItemViewModel } from "./patreonItemViewModel";
import { PatreonSettingsViewModel } from "./patreonSettingsViewModel";

export interface PatreonViewModel {
    userGuid: string;
    patrons: PatreonItemViewModel[];
    hasTwitch: boolean;
    settings: PatreonSettingsViewModel;
    saveDate: Date;
}
