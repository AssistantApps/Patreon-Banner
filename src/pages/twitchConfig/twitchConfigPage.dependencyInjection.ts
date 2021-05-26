
import { IDependencyInjection } from '../../integration/dependencyInjection';
import { LoginService } from '../../services/api/LoginService';
import { PatreonService } from '../../services/api/PatreonService';
import { LoggingService } from '../../services/common/LoggingService';
import { OAuthClient } from '../../services/common/signal/OAuthClient';
import { StorageService } from '../../services/StorageService';
import { TwitchAuthenticationService } from '../../services/twitch/TwitchAuthenticationService';

export interface IExpectedServices {
    storageService: StorageService;
    twitchAuthService: TwitchAuthenticationService;
    patreonService: PatreonService;
    loginService: LoginService;
    oAuthClient: OAuthClient;
    loggingService: LoggingService;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    const { storageService, twitchAuthService, patreonService, loginService, oAuthClient, loggingService } = services;
    return {
        storageService,
        twitchAuthService,
        patreonService,
        loginService,
        oAuthClient,
        loggingService,
    }
};