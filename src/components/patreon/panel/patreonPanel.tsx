import React from 'react';
import { withRouter } from 'react-router-dom';

import { BasicImage } from '../../core/image';
import { BasicLink } from '../../core/link';
import { AppImage } from '../../../constants/appImage';
import { NetworkState } from '../../../constants/enum/networkState';
import { patreonTestData } from '../../../constants/testData/patreonTestData';
import { TwitchUser } from '../../../contracts/twitchAuth';
import { ResultWithValue } from '../../../contracts/results/ResultWithValue';
import { PatreonViewModel } from '../../../contracts/generated/ViewModel/patreonViewModel';
import { SmallLoading } from '../../../components/loading';
import { getApp } from '../../../helper/configHelper';
import { anyObject } from '../../../helper/typescriptHacks';
import { withServices } from '../../../integration/dependencyInjection';

import { dependencyInjectionToProps, IExpectedServices } from './patreonPanel.dependencyInjection';
import { PatreonVerticalList } from '../patreonVerticalList';

interface IWithoutExpectedServices {
    match?: any
}

interface IProps extends IExpectedServices, IWithoutExpectedServices { }

interface IState {
    isTestData: boolean;
    patreonNetworkState: NetworkState;
    patronSettings: PatreonViewModel;
    channelId: string;

    // Twitch
    twitch: any;
    twitchTheme: string;
    twitchStatus: NetworkState;
    isVisible: boolean;
}

export class PatreonPanelUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            channelId: '',
            isTestData: false,
            patreonNetworkState: NetworkState.Loading,
            patronSettings: anyObject,

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

        let isTestData: boolean = false;
        let patronsResult: ResultWithValue<PatreonViewModel> = anyObject;
        if (channelId != null) {
            patronsResult = await this.props.patreonService.getFromChannelId(channelId);
        } else {
            patronsResult = patreonTestData();
            isTestData = true;
        }

        if (!patronsResult.isSuccess) {
            this.setState(() => {
                return {
                    isTestData: true,
                    patronSettings: patreonTestData().value,
                    patreonNetworkState: NetworkState.Error,
                }
            });
            return;
        }

        this.setState(() => {
            return {
                isTestData,
                channelId: channelId ?? '',
                patronSettings: patronsResult.value,
                patreonNetworkState: NetworkState.Success,
            }
        });
    }

    render() {
        const { patronSettings, patreonNetworkState, isTestData } = this.state;
        if (patreonNetworkState === NetworkState.Pending || patreonNetworkState === NetworkState.Loading) {
            return <SmallLoading additionalClasses="mt5" />;
        }

        return (
            <div id="panel" className="bg" draggable={false}>
                <PatreonVerticalList patronSettings={patronSettings} />
                <BasicLink id="ad" href={getApp()}>
                    <BasicImage imageUrl={AppImage.logo100} />
                </BasicLink>
                {
                    isTestData &&
                    <div id="testData">
                        <span>Sample data</span>
                    </div>
                }
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

