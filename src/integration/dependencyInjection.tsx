import React, { ReactNode } from "react";
import { anyObject } from "../helper/typescriptHacks";

import { LoginService } from "../services/api/LoginService";
import { PatreonService } from "../services/api/PatreonService";
import { AssistantAppsService } from "../services/api/AssistantAppsService";

import { MockPatreonService } from "../services/api/mock/PatreonService";

import { LoggingService } from "../services/common/LoggingService";
import { AnalyticsService } from "../services/common/AnalyticsService";
import { OAuthClient } from "../services/common/signal/OAuthClient";

import { TwitchAuthenticationService } from "../services/twitch/TwitchAuthenticationService";
import { StorageService } from "../services/StorageService";

export interface IDependencyInjection {
    loginService: LoginService;
    patreonService: PatreonService;
    assistantAppsService: AssistantAppsService;
    twitchAuthService: TwitchAuthenticationService;
    oAuthClient: OAuthClient;

    // Common
    storageService: StorageService;
    loggingService: LoggingService;
    analyticsService: AnalyticsService;
}

interface IServiceOptionsProps {
    analyticsEnabled?: boolean;
    loggingEnabled?: boolean;
}
type GetServices = (props: IServiceOptionsProps) => IDependencyInjection;
export const defaultDependencyInjectionFunc: GetServices = (props: IServiceOptionsProps) => {
    return {
        loginService: new LoginService(),
        patreonService: new PatreonService(),
        assistantAppsService: new AssistantAppsService(),
        twitchAuthService: new TwitchAuthenticationService(anyObject),
        oAuthClient: new OAuthClient(),

        // Common
        storageService: new StorageService(),
        loggingService: new LoggingService(props),
        analyticsService: new AnalyticsService(props),
    }
}

export const mockDependencyInjectionFunc: GetServices = (props: IServiceOptionsProps) => {
    return {
        loginService: new LoginService(),
        patreonService: new MockPatreonService(),
        assistantAppsService: new AssistantAppsService(),
        twitchAuthService: new TwitchAuthenticationService(anyObject),
        oAuthClient: new OAuthClient(),

        // Common
        storageService: new StorageService(),
        loggingService: new LoggingService(props),
        analyticsService: new AnalyticsService(props),
    }
}

/* ------------------------------------------ Methods ------------------------------------------ */

export const DependencyInjectionContext = React.createContext<IDependencyInjection>(anyObject);

interface IDependencyInjectionProviderProps extends IServiceOptionsProps {
    children: ReactNode;
}
export const DependencyInjectionProvider: React.FC<IDependencyInjectionProviderProps> = (props: IDependencyInjectionProviderProps) => {
    return (
        <DependencyInjectionContext.Provider value={defaultDependencyInjectionFunc({ ...props })}>
            {props.children}
        </DependencyInjectionContext.Provider>
    );
};

export const MockDependencyInjectionProvider: React.FC<IDependencyInjectionProviderProps> = (props: IDependencyInjectionProviderProps) => {
    return (
        <DependencyInjectionContext.Provider value={mockDependencyInjectionFunc({ ...props })}>
            {props.children}
        </DependencyInjectionContext.Provider>
    );
};

export function withServices<WithoutExpectedServicesType, ExpectedServicesType>(WrappedComponent: any, mapper: (services: IDependencyInjection) => ExpectedServicesType) {
    const wrapper: React.FC<WithoutExpectedServicesType> = (props: WithoutExpectedServicesType) => {
        return (
            <DependencyInjectionContext.Consumer>
                {
                    (services: IDependencyInjection) =>
                        <WrappedComponent {...(mapper(services))} {...props} />
                }
            </DependencyInjectionContext.Consumer>
        );
    }
    return wrapper;
}