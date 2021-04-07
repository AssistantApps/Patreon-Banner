import { patreonBanner } from '../../constants/enum/apiEndpoints';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';
import { TwitchConfigViewModel } from '../../contracts/generated/ViewModel/twitchConfigViewModel';
import { Result, ResultWithValue } from '../../contracts/results/ResultWithValue';
import { BaseApiService } from '../BaseApiService';

export class PatreonService extends BaseApiService {

    async getAll(): Promise<ResultWithValue<Array<PatreonViewModel>>> {
        return await this.get(patreonBanner);
    }

    async submitTwitchConfig(data: TwitchConfigViewModel): Promise<Result> {
        return await this.post(patreonBanner, data);
    }
}
