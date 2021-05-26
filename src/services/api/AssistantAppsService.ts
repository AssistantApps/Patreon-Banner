import { VersionViewModel } from '../../contracts/generated/AssistantApps/Version/versionViewModel';
import { VersionSearchViewModel } from '../../contracts/generated/AssistantApps/Version/versionSearchViewModel';
import { ResultWithValue, ResultWithValueAndPagination } from '../../contracts/results/ResultWithValue';
import { getAAppApiUrl, getAAppAppGuid } from '../../helper/configHelper';
import { BaseApiService } from '../BaseApiService';

export class AssistantAppsService extends BaseApiService {
    constructor() {
        super(getAAppApiUrl());
    }

    async getWhatIsNewItems(search: VersionSearchViewModel): Promise<ResultWithValueAndPagination<Array<VersionViewModel>>> {
        const newData = {
            ...search,
            appGuid: getAAppAppGuid(),
        };
        var result = await this.post<Array<VersionViewModel>, VersionSearchViewModel>(
            'Version/Search', newData,
            (headers) => headers,
            (response: any) => {
                return {
                    ...response.data,
                    isSuccess: true,
                    errorMessage: '',
                };
            });

        return result as ResultWithValueAndPagination<Array<VersionViewModel>>;
    }
}
