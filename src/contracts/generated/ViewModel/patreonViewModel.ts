/* Auto Generated */

import { PatreonItemViewModel } from "./patreonItemViewModel";
import { PatreonSettingsViewModel } from "./patreonSettingsViewModel";
import { UserPatreonTierViewModel } from "./userPatreonTierViewModel";

export interface PatreonViewModel {
    userGuid: string;
    premiumLevel: number;
    patrons: PatreonItemViewModel[];
    hasTwitch: boolean;
    settings: PatreonSettingsViewModel;
    tiers: UserPatreonTierViewModel[];
    saveDate: Date;
}
