import moment from 'moment';
import * as apiEndpoints from '../../constants/enum/apiEndpoints';
import * as storageType from '../../constants/enum/storageType';
import { Result } from '../../contracts/results/ResultWithValue';
import { BaseApiService } from '../BaseApiService';
import { StorageService } from '../StorageService';

export class LoginService extends BaseApiService {
    async loginWithPatreonOAuthCode(patreonCode: string, storageServ: StorageService): Promise<Result> {
        const body = { Code: patreonCode }
        const apiResult = await this.post(apiEndpoints.oAuthWithPatreonCode, body, (headers) => {
            debugger;
            const token = headers.token;
            const userGuid = headers.userguid;
            const timeTillExpiry = headers.tokenexpiry;

            this.setInterceptors(token);
            const expiry = moment().add(timeTillExpiry, 'seconds');

            storageServ.set(storageType.token, token, expiry.toDate());
            storageServ.set(storageType.userGuid, userGuid, expiry.toDate());
        });

        return {
            isSuccess: apiResult.isSuccess,
            errorMessage: apiResult.errorMessage,
        };
    }
}
