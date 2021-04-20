import React from 'react';

import * as storageKey from '../../constants/storageKey';
import { NetworkState } from '../../constants/enum/networkState';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';
import { anyObject } from '../../helper/typescriptHacks';

import { withServices } from '../../integration/dependencyInjection';

import { dependencyInjectionToProps, IExpectedServices } from './configPage.dependencyInjection';
import { ConfigPagePresenter } from './configPagePresenter';

declare global {
    interface Window {
        Twitch: any
    }
}

interface IWithoutExpectedServices { }

interface IProps extends IExpectedServices, IWithoutExpectedServices { }

interface IState {
    fetchExistingStatus: NetworkState;
    existingSettingsPayload: PatreonViewModel;
}

export class ConfigPageContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            fetchExistingStatus: NetworkState.Pending,
            existingSettingsPayload: anyObject,
        };
    }

    componentDidMount() {
        const currentGuid = this.props.storageService?.get<string>(storageKey.userGuid);
        if (currentGuid != null && currentGuid.isSuccess) {
            this.setLoadingForFetchExistingSettings(currentGuid.value);
        }
    }

    setLoadingForFetchExistingSettings = (userGuid: string) => {
        this.setState(() => {
            return {
                fetchExistingStatus: NetworkState.Loading
            }
        }, () => this.fetchExistingSettings(userGuid))
    };

    fetchExistingSettings = async (userGuid: string) => {
        var existingSettingsresult = await this.props.patreonService.getFromGuid(userGuid);
        if (!existingSettingsresult.isSuccess) {
            this.props.loggingService?.error(existingSettingsresult.errorMessage);

            this.setState(() => {
                return {
                    fetchExistingStatus: NetworkState.Error,
                }
            });
            return;
        }

        this.setState(() => {
            return {
                fetchExistingStatus: NetworkState.Success,
                existingSettingsPayload: existingSettingsresult.value
            }
        });
    }

    render() {
        return (
            <ConfigPagePresenter
                {...this.state}
                {...this.props}
            />
        )
    }
}

export const ConfigPageContainer = withServices<IWithoutExpectedServices, IExpectedServices>(
    ConfigPageContainerUnconnected,
    dependencyInjectionToProps
);
