import React from 'react';
import { withRouter } from 'react-router-dom';

import { DefaultPatreonSettings } from '../../../constants/designPalette';
import { NetworkState } from '../../../constants/enum/networkState';
import { TwitchUser } from '../../../contracts/twitchAuth';
import { ResultWithValue } from '../../../contracts/results/ResultWithValue';
import { PatreonViewModel } from '../../../contracts/generated/ViewModel/patreonViewModel';
import { SmallLoading } from '../../loading';
import { anyObject } from '../../../helper/typescriptHacks';
import { withServices } from '../../../integration/dependencyInjection';

import { dependencyInjectionToProps, IExpectedServices } from './patreonPanel.dependencyInjection';
import { PatreonPanelPresenter } from './patreonPanelPresenter';

interface IWithoutExpectedServices {
    match?: any
}

interface IProps extends IExpectedServices, IWithoutExpectedServices { }

interface IState {
    patreonNetworkState: NetworkState;
    patronVm: PatreonViewModel;
    channelId: string;

    // Twitch
    twitch: any;
    twitchTheme: string;
    twitchStatus: NetworkState;
    isVisible: boolean;
}

class PatreonPanelContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            channelId: '',
            patreonNetworkState: NetworkState.Loading,
            patronVm: anyObject,

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
                this.props.loggingService.log?.('current auth', auth);
                if (this.state.twitchStatus !== NetworkState.Success) {
                    this.setState(() => {
                        return {
                            twitchStatus: NetworkState.Success,
                        }
                    }, () => this.getPatronSettings(auth.channelId));
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

    getPatronSettings = async (channelId?: string) => {
        this.props.loggingService.log?.('getPatronSettings', channelId);

        let patronsResult: ResultWithValue<PatreonViewModel> = anyObject;
        if (channelId != null) {
            patronsResult = await this.props.patreonService.getFromChannelId(channelId);
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
                channelId: channelId ?? '',
                patronVm: {
                    ...patronsResult.value,
                    settings: patronsResult?.value?.settings ?? DefaultPatreonSettings
                },
                patreonNetworkState: NetworkState.Success,
            }
        });
    }

    render() {
        const { patreonNetworkState } = this.state;
        if (patreonNetworkState === NetworkState.Pending || patreonNetworkState === NetworkState.Loading) {
            return <SmallLoading additionalClasses="mt5" />;
        }

        return (<PatreonPanelPresenter {...this.state} />);
    }
}

export const PatreonPanelContainer = withRouter(
    withServices<IWithoutExpectedServices, IExpectedServices>(
        PatreonPanelContainerUnconnected,
        dependencyInjectionToProps
    )
);

