import React from 'react';

import { NetworkState } from '../../constants/enum/networkState';
import { PlatformType } from '../../contracts/generated/AssistantApps/platformType';
import { VersionSearchViewModel } from '../../contracts/generated/AssistantApps/Version/versionSearchViewModel';
import { VersionViewModel } from '../../contracts/generated/AssistantApps/Version/versionViewModel';
import { withServices } from '../../integration/dependencyInjection';

import { dependencyInjectionToProps, IExpectedServices } from './whatIsNew.dependencyInjection';
import { WhatIsNewPresenter } from './whatIsNewPresenter';

interface IWithoutExpectedServices {
    match?: any
    location?: any
}

interface IProps extends IExpectedServices, IWithoutExpectedServices { }

interface IState {
    whatIsNewItems: Array<VersionViewModel>;
    selectedWhatIsNewItemIndex: number;
    whatIsNewStatus: NetworkState;
    whatIsNewSearchObj: VersionSearchViewModel;
}

export class WhatIsNewPageUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            whatIsNewItems: [],
            selectedWhatIsNewItemIndex: 0,
            whatIsNewStatus: NetworkState.Loading,
            whatIsNewSearchObj: {
                appGuid: '',
                platforms: [PlatformType.web],
                languageCode: 'en',
                page: 1,
            },
        };
    }

    componentDidMount() {
        const { whatIsNewSearchObj } = this.state;
        this.fetchWhatIsNewItems(whatIsNewSearchObj);
    }

    fetchWhatIsNewItems = async (whatIsNewSearchObj: VersionSearchViewModel) => {
        const service = this.props.assistantAppsService;
        var whatIsNewListResult = await service.getWhatIsNewItems(whatIsNewSearchObj);
        if (!whatIsNewListResult.isSuccess) {
            this.setState(() => {
                return {
                    whatIsNewStatus: NetworkState.Error
                }
            });
            return;
        }
        this.setState(() => {
            return {
                whatIsNewItems: whatIsNewListResult.value,
                whatIsNewStatus: NetworkState.Success
            }
        });
    }

    setWhatIsNewItemIndex = (selectedWhatIsNewItemIndex: number) => {
        if (this.state.selectedWhatIsNewItemIndex === selectedWhatIsNewItemIndex) {
            this.setState({ selectedWhatIsNewItemIndex: -1 });
            return;
        }
        this.setState({ selectedWhatIsNewItemIndex })
    };

    render() {
        return (
            <WhatIsNewPresenter
                {...this.state}
                setWhatIsNewItemIndex={this.setWhatIsNewItemIndex}
            />
        );
    }
}

export const WhatIsNewPage = withServices<IWithoutExpectedServices, IExpectedServices>(
    WhatIsNewPageUnconnected,
    dependencyInjectionToProps
);
