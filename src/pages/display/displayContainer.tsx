import React from 'react';
import { withRouter } from 'react-router-dom';
import * as qs from 'query-string';

import { NetworkState } from '../../constants/enum/networkState';
import { DefaultPatreonSettings } from '../../constants/designPalette';
import { patreonTestData } from '../../constants/testData/patreonTestData';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';
import { anyObject } from '../../helper/typescriptHacks';
import { setDocumentTitle } from '../../helper/documentHelper';
import { withServices } from '../../integration/dependencyInjection';

import { DisplayPagePresenter } from './displayPresenter';

import { dependencyInjectionToProps, IExpectedServices } from './display.dependencyInjection';

interface IWithoutExpectedServices {
    match?: any
    location?: any
}

interface IProps extends IExpectedServices, IWithoutExpectedServices { }

interface IState {
    patreonNetworkState: NetworkState;
    patronVm: PatreonViewModel;
}

export class DisplayPageUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            patreonNetworkState: NetworkState.Pending,
            patronVm: anyObject,
        };
    }

    componentDidMount() {
        this.getPatronSettings();
        setDocumentTitle('Patreon Display');
    }

    getPatronSettings = async () => {
        let params: any = qs.parse(this.props.location.search);

        if (params == null || params.guid == null) {
            params = this.props?.match?.params;
        }

        let patronsResult: ResultWithValue<PatreonViewModel> = anyObject;
        if (params.guid != null) {
            patronsResult = await this.props.patreonService.getFromGuid(params.guid);
        } else {
            patronsResult = patreonTestData();
        }

        if (!patronsResult.isSuccess) {
            this.setState(() => {
                return {
                    patreonNetworkState: NetworkState.Error,
                }
            });
            return;
        }

        this.setState(() => {
            return {
                patronVm: {
                    ...patronsResult.value,
                    settings: patronsResult?.value?.settings ?? DefaultPatreonSettings
                },
                patreonNetworkState: NetworkState.Success,
            }
        });
    }

    render() {
        return (
            <div id="display" className="height-100vh" draggable={false}>
                <DisplayPagePresenter {...this.state} />
            </div>
        );
    }
}

export const DisplayPage = withRouter(
    withServices<IWithoutExpectedServices, IExpectedServices>(
        DisplayPageUnconnected,
        dependencyInjectionToProps
    )
);

