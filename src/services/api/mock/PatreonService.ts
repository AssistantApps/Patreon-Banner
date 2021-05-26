import { PatreonSettingsViewModel } from '../../../contracts/generated/ViewModel/patreonSettingsViewModel';
import { PatreonViewModel } from '../../../contracts/generated/ViewModel/patreonViewModel';
import { TwitchConfigViewModel } from '../../../contracts/generated/ViewModel/twitchConfigViewModel';
import { Result, ResultWithValue } from '../../../contracts/results/ResultWithValue';
import { anyObject } from '../../../helper/typescriptHacks';
import { BaseApiService } from '../../BaseApiService';

export class MockPatreonService extends BaseApiService {

    async getFromGuid(guid: string): Promise<ResultWithValue<PatreonViewModel>> {
        return {
            isSuccess: true,
            errorMessage: '',
            value: {
                settings: anyObject,
                campaignUrl: '',
                hasTwitch: false,
                premiumLevel: 1,
                saveDate: new Date(),
                tiers: [],
                userGuid: guid,
                patrons: []
            }
        };
    }

    async getFromChannelId(channelId: string): Promise<ResultWithValue<PatreonViewModel>> { return this.getFromGuid(channelId); }

    async submitSettings(guid: string, settings: PatreonSettingsViewModel): Promise<Result> {
        return {
            isSuccess: true,
            errorMessage: '',
        };
    }

    async submitTwitchConfigForm(data: TwitchConfigViewModel): Promise<Result> {
        return {
            isSuccess: true,
            errorMessage: '',
        };
    }
}
