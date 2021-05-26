/* Auto Generated */

import { PatreonSettingsViewModel } from "./patreonSettingsViewModel";
import { PatreonItemViewModel } from "./patreonItemViewModel";
import { UserPatreonTierViewModel } from "./userPatreonTierViewModel";

export interface PatreonViewModel {
    userGuid: string;
    premiumLevel: number;
    hasTwitch: boolean;
    campaignUrl: string;
    settings: PatreonSettingsViewModel;
    patrons: PatreonItemViewModel[];
    tiers: UserPatreonTierViewModel[];
    saveDate: Date;
}
