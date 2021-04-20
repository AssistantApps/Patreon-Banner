import React from 'react';
import moment from 'moment';
import { withRouter, useHistory } from 'react-router-dom';

import * as routes from '../../constants/route';
import * as storageKey from '../../constants/storageKey';
import { Loading } from '../../components/loading';
import { withServices } from '../../integration/dependencyInjection';

import { dependencyInjectionToProps, IExpectedServices } from './authTokenFromServer.dependencyInjection';

interface IWithoutExpectedServices {
    match?: any
}

interface IProps extends IExpectedServices, IWithoutExpectedServices { }

export const AuthTokenFromServerPageUnconnected: React.FC<IProps> = (props: IProps) => {
    const history = useHistory();

    const currentGuid = props.storageService?.get<string>(storageKey.userGuid);
    if (currentGuid != null && currentGuid.isSuccess) {
        history.push(routes.config);
        return (<span></span>);
    }

    const guidToken = props.match?.params?.guid;
    const authToken = props.match?.params?.token;
    const timeTillExpiry = props.match?.params?.timeTillExpiry;

    if (guidToken != null && authToken != null && timeTillExpiry != null) {
        var expiry = moment().add(timeTillExpiry, 'seconds');
        props.storageService.set(storageKey.userGuid, guidToken, expiry.toDate());
        props.storageService.set(storageKey.authToken, authToken, expiry.toDate());
        props.patreonService.setInterceptors(authToken);

        history.push(routes.config);
    }
    else {
        history.push(routes.error);
    }

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
