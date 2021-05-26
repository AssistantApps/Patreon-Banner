import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

import { NetworkState } from '../../constants/enum/networkState';
import { TwitchConfigViewModel } from '../../contracts/generated/ViewModel/twitchConfigViewModel';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

import { TextInput } from '../../components/common/form/textInput';
import { SmallLoading, TinyLoading } from '../../components/loading';
import { PatreonButton } from '../../components/patreon/patreonButton';
import { TwitchPanelSettings } from '../../components/settings/twitchPanelSettings';
import { BrowserSourceSettings } from '../../components/settings/browserSourceSettings';

import { getDisplayUrl } from '../../helper/configHelper';
import { patronOAuthUrlForTwitch } from '../../integration/patreonOAuth';

import { IExpectedServices } from './twitchConfigPage.dependencyInjection';
import { SegmentedControl } from '../../components/common/segmentedControl/segmentedControl';

export interface ITwitchConfigPageContainerProps {
    toggleShowCustomisations: () => void;
    setCustomisationTabIndex: (newCustomisationTabIndex: number) => void;
    editSettings: <T extends unknown>(name: string) => (value: T) => void;
    saveSettings: () => void;
}

export interface ITwitchConfigPagePresenterProps {
    fetchExistingStatus: NetworkState;
    existingSettingsPayload: PatreonViewModel;

    submissionData: TwitchConfigViewModel;
    showSaveButton: boolean;
    jwtNetworkState: NetworkState;
    showCustomisations: boolean;
    customisationTabIndex: number;

    // Twitch
    twitch: any;
    twitchTheme: string;
    twitchStatus: NetworkState;
}

interface IProps extends ITwitchConfigPagePresenterProps, ITwitchConfigPageContainerProps, IExpectedServices { }

export const TwitchConfigPagePresenter: React.FC<IProps> = (props: IProps) => {
    if (
        props.twitchStatus === NetworkState.Loading ||
        props.twitchStatus === NetworkState.Pending ||
        props.fetchExistingStatus === NetworkState.Loading ||
        props.fetchExistingStatus === NetworkState.Pending
    ) {
        return (<div className="mt5"><SmallLoading /></div>);
    }

    const renderStatusSection = (localProps: IProps, existingFetchSuccessful: boolean) => {
        const userDisplayUrl = getDisplayUrl(localProps.existingSettingsPayload?.userGuid);

        if (existingFetchSuccessful) {
            return (
                <>
                    <p>
                        <i>{localProps.existingSettingsPayload?.patrons?.length ?? 0} Patreons loaded </i>🚀
                    <br />
                        <i>Last refresh: {moment(localProps.existingSettingsPayload?.saveDate ?? new Date()).fromNow()}</i>
                        <br /><br />
                        <span>You are all set up and ready to go! Use the url below as a Browser Source in your Streaming tool of choice.</span>
                    </p>

                    <div className="pos-rel">
                        <TextInput
                            key="displayUrl"
                            id="displayUrl"
                            name="displayUrl"
                            label="Browser Source Url"
                            value={userDisplayUrl}
                            onChange={() => { }}
                            placeholder="An Error has occurred"
                        />
                        <a href={userDisplayUrl} target="_blank" rel="noopener noreferrer"
                            className="icon medium icon-browser" draggable={false}
                            style={{ position: 'absolute', top: '1rem', right: '-0.3rem' }}
                        ></a>
                    </div>
                </>
            );
        }

        return (
            <>
                <p style={{ marginBottom: '1em' }}>No settings found for your Twitch account.</p>
                <PatreonButton onClick={() => {
                    localProps.oAuthClient.joinGroup(localProps.submissionData.channelId);
                    const url = patronOAuthUrlForTwitch(localProps.submissionData);
                    localProps.loggingService?.log('url', url);
                    window.open(url, "mywindow", "resizable=1,width=800,height=800");
                }} />
            </>
        );
    }

    const existingFetchSuccessful = props.fetchExistingStatus === NetworkState.Success;
    const hasUserConfig = existingFetchSuccessful && props.existingSettingsPayload && props.existingSettingsPayload.userGuid;
    const showTwitchSettings = (props.showCustomisations && props.fetchExistingStatus === NetworkState.Success && props.existingSettingsPayload.patrons != null && props.customisationTabIndex === 0);

    return (
        <div id="main" className={classNames('twitch pr1', props.twitchTheme)}>
            <section id="config" className="main" style={{ paddingTop: '1em' }}>
                <div className="spotlight">
                    <div className="content">
                        {renderStatusSection(props, existingFetchSuccessful)}
                    </div>
                </div>
                <div className="ta-center">
                    {
                        props.jwtNetworkState === NetworkState.Loading &&
                        <button className="primary button mt1" disabled><TinyLoading /></button>
                    }
                    {
                        (props.jwtNetworkState === NetworkState.Success && props.showCustomisations === false && hasUserConfig) &&
                        <button className="primary button mt1" onClick={props.toggleShowCustomisations}>Customize</button>
                    }
                    {
                        (props.showCustomisations && hasUserConfig) &&
                        <SegmentedControl
                            options={[{ label: 'Twitch Panel settings', value: 0 }, { label: 'Browser Source settings', value: 1 }]}
                            defaultSelectedOptionIndex={props.customisationTabIndex}
                            onChange={props.setCustomisationTabIndex}
                        />
                    }
                </div>
            </section>
            {
                props.showCustomisations &&
                <>
                    {
                        showTwitchSettings
                            ? <TwitchPanelSettings
                                patreonData={props.existingSettingsPayload}
                                showSaveButton={props.showSaveButton}
                                editSettings={props.editSettings}
                                onSave={props.saveSettings}
                            />
                            : <BrowserSourceSettings
                                patreonData={props.existingSettingsPayload}
                                showSaveButton={props.showSaveButton}
                                editSettings={props.editSettings}
                                onSave={props.saveSettings}
                            />
                    }
                </>
            }
        </div>
    );
}
