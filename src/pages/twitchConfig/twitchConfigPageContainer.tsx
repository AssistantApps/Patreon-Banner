import React from 'react';
import Swal from 'sweetalert2';
import { sha1 } from 'object-hash';

import { withServices } from '../../integration/dependencyInjection';
import { NetworkState } from '../../constants/enum/networkState';
import { DefaultPatreonSettings } from '../../constants/designPalette';

import { TwitchUser } from '../../contracts/twitchAuth';
import { PatreonSettingsViewModel } from '../../contracts/generated/ViewModel/patreonSettingsViewModel';
import { TwitchConfigViewModel } from '../../contracts/generated/ViewModel/twitchConfigViewModel';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';
import { anyObject } from '../../helper/typescriptHacks';

import { dependencyInjectionToProps, IExpectedServices } from './twitchConfigPage.dependencyInjection';
import { TwitchConfigPagePresenter } from './twitchConfigPagePresenter';
import { stringify } from 'query-string';

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
    initialSettingsHash: string;
    settingsHash: string;

    submissionData: TwitchConfigViewModel;
    getJwtStatus: NetworkState;
    showCustomisations: boolean;
    customisationTabIndex: number;

    // Twitch
    twitch: any;
    twitchTheme: string;
    twitchStatus: NetworkState;
    isVisible: boolean;
}

export class TwitchConfigPageContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            fetchExistingStatus: NetworkState.Pending,
            existingSettingsPayload: anyObject,
            initialSettingsHash: '',
            settingsHash: '',

            submissionData: anyObject,
            getJwtStatus: NetworkState.Pending,
            showCustomisations: false,
            customisationTabIndex: 0,

            // Twitch
            twitch: window.Twitch ? window.Twitch.ext : null,
            twitchTheme: 'dark',
            twitchStatus: NetworkState.Pending,
            isVisible: true
        };
    }

    componentDidMount() {
        this.props.oAuthClient.listenToOAuth(this.setLoadingForFetchExistingSettings);
        if (this.state.twitch) {
            this.state.twitch.onAuthorized((auth: TwitchUser) => {
                this.props.twitchAuthService.setToken(auth.token, auth.userId);
                this.props.loggingService.log?.('set Token', auth);
                if (this.state.twitchStatus !== NetworkState.Success) {
                    this.setState(() => {
                        return {
                            submissionData: {
                                clientId: auth.clientId,
                                channelId: auth.channelId,
                                twitchAuthToken: auth.token,
                            },
                            twitchStatus: NetworkState.Success,
                            getJwtStatus: NetworkState.Loading,
                            fetchExistingStatus: NetworkState.Loading,
                        }
                    }, () => {
                        this.fetchJwtFromTwitchAuth(auth);
                        this.fetchExistingSettings(auth.channelId);
                    });
                }
            });

            this.state.twitch.listen('broadcast', (target: any, contentType: any, body: any) => {
                this.props.loggingService.log?.('broadcast', `New PubSub message!\n${target}\n${contentType}\n${body}`);
            });

            this.state.twitch.onContext((context: any, delta: any) => {
                this.props.loggingService.log?.('onContext', context, delta);
                if (context.theme == null) return;
                this.setState(() => {
                    return {
                        twitchTheme: context.theme,
                    }
                });
            })
        }
    }

    componentWillUnmount() {
        this.props.oAuthClient.leaveGroup(this.state.submissionData.channelId);
        this.props.oAuthClient.removeListenToOAuth(this.setLoadingForFetchExistingSettings);
        if (this.state.twitch) {
            this.state.twitch.unlisten('broadcast', () => this.props.loggingService.log?.('successfully unlistened'))
        }
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

        let existingSettingsresult = await this.props.patreonService.getFromChannelId(channelId);
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
                existingSettingsPayload: {
                    ...existingSettingsresult.value,
                    settings: existingSettingsresult.value.settings ?? DefaultPatreonSettings
                },
                initialSettingsHash: sha1(existingSettingsresult.value.settings),
                settingsHash: sha1(existingSettingsresult.value.settings),
            }
        });
    }

    fetchJwtFromTwitchAuth = async (auth: TwitchUser) => {
        const { clientId, channelId, token } = auth;
        this.props.loggingService.log?.('fetchJwtFromSettings',);

        const jwtResult = await this.props.loginService.getJwtFromTwitchAuth(clientId, channelId, token, this.props.storageService);
        this.setState(() => {
            return {
                getJwtStatus: jwtResult.isSuccess
                    ? NetworkState.Success
                    : NetworkState.Error,
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
        const channelId = this.state.submissionData.channelId;
        const { userGuid, settings } = this.state.existingSettingsPayload;

        const saveSettingsResult = await this.props.patreonService.submitSettings(userGuid, settings);
        if (!saveSettingsResult.isSuccess) {
            Swal.fire('Ooops', 'Something went wrong', 'error');
            this.setState({
                fetchExistingStatus: NetworkState.Error,
            });
            return;
        }
        await this.fetchExistingSettings(channelId);
    }

    render() {
        return (
            <TwitchConfigPagePresenter
                {...this.state}
                {...this.props}
                jwtNetworkState={this.state.getJwtStatus}
                showSaveButton={(this.state.initialSettingsHash != this.state.settingsHash)}
                toggleShowCustomisations={this.toggleShowCustomisations}
                setCustomisationTabIndex={this.setCustomisationTabIndex}
                saveSettings={this.prepareToSaveSettings}
                editSettings={this.editSettings}
            />
        )
    }
}

export const TwitchConfigPageContainer = withServices<IWithoutExpectedServices, IExpectedServices>(
    TwitchConfigPageContainerUnconnected,
    dependencyInjectionToProps
);
