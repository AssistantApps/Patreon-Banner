import React from 'react';
import Swal from 'sweetalert2';
import { sha1 } from 'object-hash';

import * as storageKey from '../../constants/storageKey';
import { NetworkState } from '../../constants/enum/networkState';
import { DefaultPatreonSettings } from '../../constants/designPalette';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';
import { PatreonSettingsViewModel } from '../../contracts/generated/ViewModel/patreonSettingsViewModel';
import { anyObject } from '../../helper/typescriptHacks';

import { withServices } from '../../integration/dependencyInjection';

import { ConfigPagePresenter } from './configPagePresenter';
import { dependencyInjectionToProps, IExpectedServices } from './configPage.dependencyInjection';

declare global {
    interface Window {
        Twitch: any
    }
}

interface IWithoutExpectedServices { }

interface IProps extends IExpectedServices, IWithoutExpectedServices { }

interface IState {
    userGuid: string;
    fetchExistingStatus: NetworkState;

    existingSettingsPayload: PatreonViewModel;
    initialSettingsHash: string;
    settingsHash: string;

    showCustomisations: boolean;
    customisationTabIndex: number;
}

export class ConfigPageContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            userGuid: '',
            fetchExistingStatus: NetworkState.Pending,

            existingSettingsPayload: anyObject,
            initialSettingsHash: '',
            settingsHash: '',

            showCustomisations: false,
            customisationTabIndex: 0,
        };
    }

    componentDidMount() {
        const currentGuid = this.props.storageService?.get<string>(storageKey.userGuid);
        if (currentGuid != null && currentGuid.isSuccess && currentGuid.value && currentGuid.value.length > 5) {
            this.setLoadingForFetchExistingSettings(currentGuid.value);
        }
    }

    setLoadingForFetchExistingSettings = (userGuid: string) => {
        this.setState(() => {
            return {
                userGuid,
                fetchExistingStatus: NetworkState.Loading
            }
        }, () => this.fetchExistingSettings(userGuid))
    };

    fetchExistingSettings = async (userGuid: string) => {
        var existingSettingsresult = await this.props.patreonService.getFromGuid(userGuid);
        if (!existingSettingsresult.isSuccess) {
            this.props.loggingService?.error(existingSettingsresult.errorMessage);
            this.props.storageService?.remove<string>(storageKey.userGuid);

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
                existingSettingsPayload: {
                    ...existingSettingsresult.value,
                    settings: existingSettingsresult.value.settings ?? DefaultPatreonSettings
                },
                initialSettingsHash: sha1(existingSettingsresult.value.settings),
                settingsHash: sha1(existingSettingsresult.value.settings),
            }
        });
    }

    toggleShowCustomisations = () => {
        this.setState((prevState: IState) => {
            return {
                showCustomisations: !prevState.showCustomisations,
            }
        });
    }

    setCustomisationTabIndex = (newCustomisationTabIndex: number) => {
        this.setState({
            customisationTabIndex: newCustomisationTabIndex,
        });
    }

    editSettings = <T extends unknown>(name: string) => (value: T) => {
        this.setState((prevState: IState) => {
            const settings: PatreonSettingsViewModel = {
                ...prevState.existingSettingsPayload.settings,
                [name]: value
            };

            console.log(settings);

            return {
                existingSettingsPayload: {
                    ...prevState.existingSettingsPayload,
                    settings,
                },
                settingsHash: sha1(settings),
            }
        });
    }

    prepareToSaveSettings = async () => {
        this.setState({
            fetchExistingStatus: NetworkState.Loading,
        }, () => this.saveSettings());
    }

    saveSettings = async () => {
        const userGuid = this.state.userGuid;
        const settings = this.state.existingSettingsPayload.settings;

        const saveSettingsResult = await this.props.patreonService.submitSettings(userGuid, settings);
        if (!saveSettingsResult.isSuccess) {
            Swal.fire('Ooops', 'Something went wrong', 'error');
            this.setState({
                fetchExistingStatus: NetworkState.Success,
            });
            return;
        }
        await this.fetchExistingSettings(this.state.userGuid);
    }

    render() {
        return (
            <ConfigPagePresenter
                {...this.state}
                {...this.props}
                showSaveButton={(this.state.initialSettingsHash != this.state.settingsHash)}
                toggleShowCustomisations={this.toggleShowCustomisations}
                setCustomisationTabIndex={this.setCustomisationTabIndex}
                saveSettings={this.prepareToSaveSettings}
                editSettings={this.editSettings}
            />
        )
    }
}

export const ConfigPageContainer = withServices<IWithoutExpectedServices, IExpectedServices>(
    ConfigPageContainerUnconnected,
    dependencyInjectionToProps
);
