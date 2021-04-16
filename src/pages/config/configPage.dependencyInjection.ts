
import { IDependencyInjection } from '../../integration/dependencyInjection';
import { PatreonService } from '../../services/api/PatreonService';
import { LoggingService } from '../../services/common/LoggingService';
import { OAuthClient } from '../../services/common/signal/OAuthClient';

export interface IExpectedServices {
    patreonService: PatreonService;
    loggingService: LoggingService;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    const { patreonService, loggingService } = services;
    return {
        patreonService,
        loggingService,
    }
};