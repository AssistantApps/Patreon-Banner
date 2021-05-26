import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import * as qs from 'query-string';

import * as routes from '../../constants/route';
import * as storageKey from '../../constants/storageKey';
import { Loading } from '../../components/loading';
import { withServices } from '../../integration/dependencyInjection';

import { dependencyInjectionToProps, IExpectedServices } from './authTokenFromServer.dependencyInjection';
import { Result } from '../../contracts/results/ResultWithValue';

interface IWithoutExpectedServices {
    location?: any
}

interface IProps extends IExpectedServices, IWithoutExpectedServices { }

export const AuthTokenFromServerPageUnconnected: React.FC<IProps> = (props: IProps) => {
    const history = useHistory();

    useEffect(() => {
        const currentGuid = props.storageService?.get<string>(storageKey.userGuid);
        if (currentGuid != null && currentGuid.isSuccess && currentGuid.value && currentGuid.value.length > 5) {
            props.loggingService.log('config is not null');
            history.push(routes.config);
            return;
        }

        const queryObj: any = qs.parse(props.location.search);
        const patreonCode = queryObj?.code;

        if (patreonCode == null) {
            props.loggingService.log('Patreon Access code is null');
            history.push(routes.error);
        }

        props.loginService.loginWithPatreonOAuthCode(patreonCode, props.storageService).then((result: Result) => {
            if (result.isSuccess) {
                props.loggingService.log('Patreon Access code login success!');
                history.push(routes.config);
            } else {
                props.loggingService.error('Unable to log in with Auth code ', result.errorMessage);
                history.push(routes.error);
            }
        });
    });

    return (
        <div className="wrapper pt5">
            <Loading />
        </div>
    );
}

export const AuthTokenFromServerPage = withRouter(
    withServices<IWithoutExpectedServices, IExpectedServices>(
        AuthTokenFromServerPageUnconnected,
        dependencyInjectionToProps
    )
);
