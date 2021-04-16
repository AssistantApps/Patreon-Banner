
import { IDependencyInjection } from '../../integration/dependencyInjection';
import { PatreonService } from '../../services/api/PatreonService';
import { LoggingService } from '../../services/common/LoggingService';
import { OAuthClient } from '../../services/common/signal/OAuthClient';
import { TwitchAuthenticationService } from '../../services/twitch/TwitchAuthenticationService';

export interface IExpectedServices {
    twitchAuthService: TwitchAuthenticationService;
    patreonService: PatreonService;
    oAuthClient: OAuthClient;
    loggingService: LoggingService;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    const { twitchAuthService, patreonService, oAuthClient, loggingService } = services;
    return {
        twitchAuthService,
        patreonService,
        oAuthClient,
        loggingService,
    }
};