
import { IDependencyInjection } from '../../integration/dependencyInjection';
import { LoggingService } from '../../services/common/LoggingService';
import { TwitchAuthenticationService } from '../../services/twitch/TwitchAuthenticationService';

export interface IExpectedServices {
    twitchAuthService: TwitchAuthenticationService;
    loggingService: LoggingService;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    const { twitchAuthService, loggingService } = services;
    return {
        twitchAuthService,
        loggingService,
    }
};