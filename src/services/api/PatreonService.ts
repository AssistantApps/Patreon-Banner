import { patreonBanner } from '../../constants/enum/apiEndpoints';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';
import { TwitchConfigViewModel } from '../../contracts/generated/ViewModel/twitchConfigViewModel';
import { Result, ResultWithValue } from '../../contracts/results/ResultWithValue';
import { BaseApiService } from '../BaseApiService';

export class PatreonService extends BaseApiService {

    async getFromGuid(guid: string): Promise<ResultWithValue<PatreonViewModel>> {
        return await this.get(`${patreonBanner}/${guid}`);
    }

    async getFromChannelId(channelId: string): Promise<ResultWithValue<PatreonViewModel>> {
        return await this.get(`${patreonBanner}/channelId/${channelId}`);
    }

    async submitTwitchConfigForm(data: TwitchConfigViewModel): Promise<Result> {
        return await this.post(patreonBanner, data);
    }

    // async submitSettingsForCampaignId(data: TwitchConfigViewModel): Promise<Result> {
    //     return await this.post(patreonBanner, data);
    // }

    // async submitSettingsFromTwitch(data: TwitchConfigViewModel): Promise<Result> {
    //     return await this.post(patreonBanner, data);
    // }
}
