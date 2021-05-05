import React from 'react';
import { withRouter } from 'react-router-dom';

import { AppImage } from '../../../constants/appImage';
import { NetworkState } from '../../../constants/enum/networkState';
import { patreonTestData } from '../../../constants/testData/patreonTestData';
import { ResultWithValue } from '../../../contracts/results/ResultWithValue';
import { PatreonViewModel } from '../../../contracts/generated/ViewModel/patreonViewModel';
import { anyObject } from '../../../helper/typescriptHacks';
import { setDocumentTitle } from '../../../helper/documentHelper';
import { withServices } from '../../../integration/dependencyInjection';

import { dependencyInjectionToProps, IExpectedServices } from './patreonPanel.dependencyInjection';
import { PatreonVerticalList } from '../patreonVerticalList';
import { BasicImage } from '../../core/image';

interface IWithoutExpectedServices {
    match?: any
}

interface IProps extends IExpectedServices, IWithoutExpectedServices { }

interface IState {
    patreonNetworkState: NetworkState;
    patronSettings: PatreonViewModel;
}

export class PatreonPanelUnconnected extends React.Component<IProps, IState> {
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
            <div id="panel" className="bg" draggable={false}>
                <div id="ad">
                    <BasicImage imageUrl={AppImage.logo100} />
                </div>
                <PatreonVerticalList patronSettings={patronSettings} />
            </div>
        );
    }
}

export const PatreonPanel = withRouter(
    withServices<IWithoutExpectedServices, IExpectedServices>(
        PatreonPanelUnconnected,
        dependencyInjectionToProps
    )
);

