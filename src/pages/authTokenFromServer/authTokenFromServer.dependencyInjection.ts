import { IDependencyInjection } from '../../integration/dependencyInjection';
import { LoginService } from '../../services/api/LoginService';
import { PatreonService } from '../../services/api/PatreonService';
import { LoggingService } from '../../services/common/LoggingService';
import { StorageService } from '../../services/StorageService';

export interface IExpectedServices {
    storageService: StorageService;
    patreonService: PatreonService;
    loginService: LoginService;
    loggingService: LoggingService;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    const { storageService, patreonService, loginService, loggingService } = services;
    return {
        storageService,
        patreonService,
        loginService,
        loggingService,
    }
};