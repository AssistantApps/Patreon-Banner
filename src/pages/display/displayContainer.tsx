import React from 'react';

import { PatreonMarquee } from '../../components/patreon/patreonMarquee';


import { withServices } from '../../integration/dependencyInjection';

import { dependencyInjectionToProps, IExpectedServices } from './display.dependencyInjection';
import { NetworkState } from '../../constants/enum/networkState';
import { patreonTestData } from '../../constants/testData/patreonTestData';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';
import { anyObject } from '../../helper/typescriptHacks';
import { setDocumentTitle } from '../../helper/documentHelper';
import { withRouter } from 'react-router-dom';

interface IWithoutExpectedServices {
    match?: any
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
        const { match: { params } } = this.props;

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
                patronSettings: patronsResult.value,
                patreonNetworkState: NetworkState.Success,
            }
        });
    }

    render() {
        const { patronSettings, patreonNetworkState } = this.state;
        if (patreonNetworkState === NetworkState.Loading) return <span></span>

        return (
            <div id="display" className="height-100vh" draggable={false}>
                <PatreonMarquee patronSettings={patronSettings} />
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

