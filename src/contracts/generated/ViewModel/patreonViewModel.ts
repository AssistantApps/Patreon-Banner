/* Auto Generated */

import { PatreonItemViewModel } from "./patreonItemViewModel";
import { PatreonSettingsViewModel } from "./patreonSettingsViewModel";
import { UserPatreonTierViewModel } from "./userPatreonTierViewModel";

export interface PatreonViewModel {
    userGuid: string;
    patrons: PatreonItemViewModel[];
    hasTwitch: boolean;
    isPremium: boolean;
    settings: PatreonSettingsViewModel;
    tiers: UserPatreonTierViewModel[];
    saveDate: Date;
}
