
import { IDependencyInjection } from '../../integration/dependencyInjection';
import { PatreonService } from '../../services/api/PatreonService';
import { LoggingService } from '../../services/common/LoggingService';
import { StorageService } from '../../services/StorageService';

export interface IExpectedServices {
    patreonService: PatreonService;
    loggingService: LoggingService;
    storageService: StorageService;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    const { patreonService, loggingService, storageService } = services;
    return {
        patreonService,
        loggingService,
        storageService,
    }
};