import * as apiEndpoints from '../../constants/enum/apiEndpoints';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { BaseApiService } from './BaseApiService';

export class PatreonService extends BaseApiService {

    async getAll(): Promise<ResultWithValue<Array<PatreonViewModel>>> {
        return await this.get(apiEndpoints.patreon);
    }
}
