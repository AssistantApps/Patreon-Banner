import React from 'react';

import { withServices } from '../../integration/dependencyInjection';
import { NetworkState } from '../../constants/enum/networkState';

import { TwitchUser } from '../../contracts/twitchAuth';
import { ConfigPagePresenter } from './configPagePresenter';
import { anyObject } from '../../helper/typescriptHacks';
import { dependencyInjectionToProps, IExpectedServices } from './configPage.dependencyInjection';
import { isFormValid } from './configPageValidations';
import { TwitchConfigViewModel } from '../../contracts/generated/ViewModel/twitchConfigViewModel';

declare global {
    interface Window {
        Twitch: any
    }
}

interface IWithoutExpectedServices {
    wrapperClass: string;
}

interface IProps extends IExpectedServices, IWithoutExpectedServices { }

interface IState {
    fetchExistingStatus: NetworkState;
    existingSettingsPayload: any;

    submissionData: TwitchConfigViewModel;
    submissionStatus: NetworkState;
    showFormValidation: boolean;

    // Twitch
    twitch: any;
    twitchTheme: string;
    twitchStatus: NetworkState;
    isVisible: boolean;
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

            // Twitch
            twitch: window.Twitch ? window.Twitch.ext : null,
            twitchTheme: 'dark',
            twitchStatus: NetworkState.Pending,
            isVisible: true
        };
    }

    componentDidMount() {
        if (this.state.twitch) {
            this.state.twitch.onAuthorized((auth: TwitchUser) => {
                this.props.twitchAuthService.setToken(auth.token, auth.userId);
                this.props.loggingService.log?.('set Token', auth);
                if (!this.state.twitchStatus) {
                    this.getChannelName(auth);
                    this.fetchExistingSettings(auth);
                    this.setState((prevState: IState) => {
                        return {
                            twitchStatus: NetworkState.Success,
                            submissionData: {
                                ...prevState.submissionData,
                                userId: auth.userId,
                                clientId: auth.clientId,
                                channelId: auth.channelId,
                                twitchAuthToken: auth.token,
                            },
                        }
                    });
                }
            })

            this.state.twitch.listen('broadcast', (target: any, contentType: any, body: any) => {
                this.props.loggingService.log?.('broadcast', `New PubSub message!\n${target}\n${contentType}\n${body}`);
            })

            // this.state.twitch.onVisibilityChanged((isVisible: any, _c: any) => {
            //     this.visibilityChanged(isVisible);
            // })

            this.state.twitch.onContext((context: any, delta: any) => {
                this.props.loggingService.log?.('onContext', context, delta);
                if (context.theme == null) return;
                this.setState(() => {
                    return {
                        twitchTheme: context.theme,
                    }
                });
                //this.contextUpdate(context, delta)
            })
        }
    }

    componentWillUnmount() {
        if (this.state.twitch) {
            this.state.twitch.unlisten('broadcast', () => this.props.loggingService.log?.('successfully unlistened'))
        }
    }

    fetchExistingSettings = (auth: TwitchUser) => {
        this.props.loggingService.log?.('fetchExistingSettings', auth.channelId);

        this.setState(() => {
            return {
                fetchExistingStatus: NetworkState.Error
            }
        })
    }

    getChannelName = async (auth: TwitchUser) => {
        // const channelQueryResult = await this.props.twitchApiService.getChannelInfo(auth.channelId);
        // if (!channelQueryResult.isSuccess) {
        //     this.props.loggingService?.error(channelQueryResult.errorMessage);
        //     //Swal
        //     return;
        // }

        // this.setState((prevState: IState) => {
        //     return {
        //         submissionData: {
        //             ...prevState.submissionData,
        //             channelName: channelQueryResult.value.display_name,
        //         }
        //     }
        // })
    }

    editFormValues = (propName: string, propValue: string) => {
        this.setState((prevState: IState) => {
            return {
                submissionData: {
                    ...prevState.submissionData,
                    [propName]: propValue
                }
            }
        });
    }

    submitConfigForm = () => {
        const isFormValidResult = isFormValid(this.state);
        if (isFormValidResult.isSuccess === false) {
            this.setState(() => {
                return {
                    showFormValidation: true,
                }
            });
            return;
        }

        this.setState(() => {
            return {
                submissionStatus: NetworkState.Loading,
            }
        }, this.submitConfigFormFunc);
    }

    private submitConfigFormFunc = async () => {
        const apiSaveResult = await this.props.patreonService.submitTwitchConfig(this.state.submissionData);
        if (!apiSaveResult.isSuccess) {
            this.props.loggingService?.error(apiSaveResult.errorMessage);
            //Swal

            this.setState(() => {
                return {
                    submissionStatus: NetworkState.Error,
                }
            });
            return;
        }

        this.setState(() => {
            return {
                submissionStatus: NetworkState.Success,
            }
        });
    }

    render() {
        return (
            <ConfigPagePresenter
                {...this.state}
                {...this.props}
                editFormValues={this.editFormValues}
                submitConfigForm={this.submitConfigForm}
            />
        )
    }
}

export const ConfigPageContainer = withServices<IWithoutExpectedServices, IExpectedServices>(
    ConfigPageContainerUnconnected,
    dependencyInjectionToProps
);
