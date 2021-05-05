
import { IDependencyInjection } from '../../../integration/dependencyInjection';
import { PatreonService } from '../../../services/api/PatreonService';
import { LoggingService } from '../../../services/common/LoggingService';
import { TwitchAuthenticationService } from '../../../services/twitch/TwitchAuthenticationService';

export interface IExpectedServices {
    twitchAuthService: TwitchAuthenticationService;
    patreonService: PatreonService;
    loggingService: LoggingService;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    const { twitchAuthService, patreonService, loggingService } = services;
    return {
        twitchAuthService,
        patreonService,
        loggingService,
    }
};