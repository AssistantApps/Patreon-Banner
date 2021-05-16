import React from 'react';
import { withRouter } from 'react-router-dom';
import * as qs from 'query-string';

import { PatreonMarquee } from '../../components/patreon/patreonMarquee';
import { NetworkState } from '../../constants/enum/networkState';
import { patreonTestData } from '../../constants/testData/patreonTestData';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';
import { anyObject } from '../../helper/typescriptHacks';
import { setDocumentTitle } from '../../helper/documentHelper';
import { withServices } from '../../integration/dependencyInjection';

import { dependencyInjectionToProps, IExpectedServices } from './display.dependencyInjection';
import { DefaultPatreonSettings } from '../../constants/designPalette';

interface IWithoutExpectedServices {
    match?: any
    location?: any
}

interface IProps extends IExpectedServices, IWithoutExpectedServices { }

interface IState {
    patreonNetworkState: NetworkState;
    patronSettings: PatreonViewModel;
}

export class DisplayPageUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            patreonNetworkState: NetworkState.Pending,
            patronSettings: anyObject,
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
                patronSettings: { ...patronsResult.value, settings: DefaultPatreonSettings }, //TODO remove this when settings are added
                patreonNetworkState: NetworkState.Success,
            }
        });
    }

    render() {
        const { patronSettings, patreonNetworkState } = this.state;
        if (patreonNetworkState !== NetworkState.Success) return <span></span>

        return (
            <div id="display" className="height-100vh" draggable={false}>
                <PatreonMarquee patronVm={patronSettings} />
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

