// import moment from 'moment';
// import * as apiEndpoints from '../../constants/enum/apiEndpoints';
// import * as storageType from '../../constants/enum/storageType';
// import { OAuthUserViewModel } from '../../contracts/generated/ViewModel/oAuthUserViewModel';
// import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { BaseApiService } from '../BaseApiService';
// import { StorageService } from '../StorageService';
// import { ILoginProps } from '../../contracts/login';

export class LoginService extends BaseApiService {
    // async loginWithOAuth(oAuthObj: OAuthUserViewModel): Promise<ResultWithValue<ILoginProps>> {
    //     var userGuid = '';
    //     var timeTillExpiry = 0;

    //     var apiResult = await this.post(apiEndpoints.authUrl, oAuthObj, (headers) => {
    //         var token = headers.token;
    //         timeTillExpiry = headers.tokenexpiry;
    //         userGuid = headers.userguid;

    //         this.setInterceptors(token);
    //         var expiry = moment().add(timeTillExpiry, 'seconds');

    //         var storageServ = new StorageService();
    //         storageServ.set(storageType.token, token, expiry.toDate());
    //         storageServ.set(storageType.userGuid, userGuid, expiry.toDate());
    //         storageServ.set(storageType.userName, oAuthObj.username, expiry.toDate());
    //     });

    //     const loginData: ILoginProps = {
    //         userGuid: userGuid,
    //         userName: oAuthObj.username,
    //         secondsTillExpire: timeTillExpiry,
    //         userProfileUrl: oAuthObj.profileUrl,
    //     };

    //     return {
    //         isSuccess: apiResult.isSuccess,
    //         value: loginData,
    //         errorMessage: apiResult.errorMessage,
    //     };
    // }
}
