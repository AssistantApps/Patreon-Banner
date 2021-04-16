import React from 'react';

import { withServices } from '../../integration/dependencyInjection';
import { NetworkState } from '../../constants/enum/networkState';

import { TwitchUser } from '../../contracts/twitchAuth';
import { TwitchConfigViewModel } from '../../contracts/generated/ViewModel/twitchConfigViewModel';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';
import { anyObject } from '../../helper/typescriptHacks';

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

    submissionData: TwitchConfigViewModel;
    submissionStatus: NetworkState;
    showFormValidation: boolean;
}

export class ConfigPageContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            fetchExistingStatus: NetworkState.Pending,
            existingSettingsPayload: anyObject,

            // Streamer Submission
            submissionData: anyObject,
            submissionStatus: NetworkState.Pending,
            showFormValidation: false,
        };
    }

    componentDidMount() {
        this.setLoadingForFetchExistingSettings('test');
    }

    setLoadingForFetchExistingSettings = (channelId?: string) => {
        if (channelId == null) {
            channelId = this.state.submissionData.channelId;
        }

        this.setState(() => {
            return {
                fetchExistingStatus: NetworkState.Loading
            }
        }, () => this.fetchExistingSettings(channelId))
    };

    fetchExistingSettings = async (channelId?: string) => {
        this.props.loggingService.log?.('fetchExistingSettings', channelId);
        if (channelId == null) return;

        var existingSettingsresult = await this.props.patreonService.getFromChannelId(channelId);
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
