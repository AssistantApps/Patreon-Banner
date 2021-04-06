import React from 'react';

import { withServices } from '../../integration/dependencyInjection';
import { NetworkState } from '../../constants/enum/networkState';

import { dependencyInjectionToProps, IExpectedServices } from './configPage.dependencyInjection';
import { ConfigPagePresenter } from './configPagePresenter';
import { anyObject } from '../../helper/typescriptHacks';
import { isFormValid } from './configPageValidations';

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

    userId: string;
    accessToken: string;
    campaignId: string;
    submissionStatus: NetworkState;
    showFormValidation: boolean;

    // Twitch
    twitch: any;
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
            userId: '',
            accessToken: '',
            campaignId: '',
            submissionStatus: NetworkState.Pending,
            showFormValidation: false,

            // Twitch
            twitch: window.Twitch ? window.Twitch.ext : null,
            twitchStatus: NetworkState.Pending,
            isVisible: true
        };
    }

    componentDidMount() {
        if (this.state.twitch) {
            this.state.twitch.onAuthorized((auth: any) => {
                this.props.twitchAuthService.setToken(auth.token, auth.userId);
                this.props.loggingService.log?.('set Token', auth.token, auth.userId);
                if (!this.state.twitchStatus) {
                    this.fetchExistingSettings(auth.userId);
                    this.setState(() => {
                        return {
                            userId: auth.userId,
                            twitchStatus: NetworkState.Success
                        }
                    })
                }
            })

            this.state.twitch.listen('broadcast', (target: any, contentType: any, body: any) => {
                this.props.loggingService.log?.(`New PubSub message!\n${target}\n${contentType}\n${body}`);
            })

            // this.state.twitch.onVisibilityChanged((isVisible: any, _c: any) => {
            //     this.visibilityChanged(isVisible);
            // })

            this.state.twitch.onContext((context: any, delta: any) => {
                this.props.loggingService.log?.(context, delta);
                //this.contextUpdate(context, delta)
            })
        }
    }

    componentWillUnmount() {
        if (this.state.twitch) {
            this.state.twitch.unlisten('broadcast', () => this.props.loggingService.log?.('successfully unlistened'))
        }
    }

    fetchExistingSettings = (userId: string) => {
        this.props.loggingService.log?.('fetchExistingSettings', userId);

        this.setState(() => {
            return {
                fetchExistingStatus: NetworkState.Error
            }
        })
    }

    editFormValues = (propName: string, propValue: string) => {
        this.setState((prevState: IState) => {
            this.props.loggingService?.log('prevState', prevState);
            return {
                [propName]: propValue,
            } as any
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

        // this.setState(() => {
        //     return {
        //     }
        // });
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
