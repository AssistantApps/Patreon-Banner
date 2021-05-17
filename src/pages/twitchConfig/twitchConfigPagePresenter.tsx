import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

import { NetworkState } from '../../constants/enum/networkState';
import { TwitchConfigViewModel } from '../../contracts/generated/ViewModel/twitchConfigViewModel';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

import { BasicLink } from '../../components/core/link';
import { TextInput } from '../../components/common/form/textInput';
import { SmallLoading } from '../../components/loading';
import { PatreonButton } from '../../components/patreon/patreonButton';
import { TwitchPanelSettings } from '../../components/settings/twitchPanelSettings';

import { getDisplayUrl } from '../../helper/configHelper';
import { patronOAuthUrlForTwitch } from '../../integration/patreonOAuth';

import { IExpectedServices } from './twitchConfigPage.dependencyInjection';

export interface ITwitchConfigPageContainerProps {
    editFormValues: (propName: string, propValue: string) => void;
    submitConfigForm: () => void;
    toggleShowCustomisations: () => void;
}

export interface ITwitchConfigPagePresenterProps {
    fetchExistingStatus: NetworkState;
    existingSettingsPayload: PatreonViewModel;

    submissionData: TwitchConfigViewModel;
    submissionStatus: NetworkState;
    showFormValidation: boolean;

    showCustomisations: boolean;

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
        return (
            <div className="mt5">
                <SmallLoading />
            </div>
        );
    }

    const renderStatusSection = (localProps: IProps) => {
        if (localProps.fetchExistingStatus === NetworkState.Success) {
            return (
                <p>
                    <i>{localProps.existingSettingsPayload?.patrons?.length ?? 0} Patreons loaded </i>🚀
                    <br />
                    <i>Last refresh: {moment(localProps.existingSettingsPayload?.saveDate ?? new Date()).fromNow()}</i>
                    <br /><br />
                    <span>You are all set up and ready to go! Use the url below as a Browser Source in your Streaming tool of choice.</span>
                </p>
            );
        }

        return (
            <p style={{ marginBottom: '1em' }}>
                No settings found for your Twitch account. <br />
                {
                    localProps.showCustomisations &&
                    <span>Please fill in the form below.These two values are required in order to fetch the list of Patrons from <BasicLink href="https://patreon.com">Patreon.com</BasicLink>.</span>
                }
            </p>
        );
    }

    const existingFetchSuccessful = props.fetchExistingStatus === NetworkState.Success;
    const userDisplayUrl = getDisplayUrl(props.existingSettingsPayload?.userGuid);

    return (
        <div id="main" className={classNames('twitch', props.twitchTheme)}>
            <section id="config" className="main" style={{ paddingTop: '1em' }}>
                <div className="spotlight">
                    <div className="content">
                        {renderStatusSection(props)}

                        {
                            (existingFetchSuccessful === false)
                                ? <PatreonButton onClick={() => {
                                    props.oAuthClient.joinGroup(props.submissionData.channelId);
                                    const url = patronOAuthUrlForTwitch(props.submissionData);
                                    props.loggingService?.log('url', url);
                                    window.open(url, "mywindow", "resizable=1,width=800,height=800");
                                }} />
                                : <div className="pos-rel">
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
                                        style={{ position: 'absolute', top: '1.45rem', right: '0.1rem' }}
                                    ></a>
                                </div>
                        }
                    </div>
                </div>
                <div className="ta-center" style={{ display: 'none' }}>
                    {/* TODO - Undo display none when enabling settings feature */}
                    {
                        (props.showCustomisations === false) &&
                        <button className="primary button mt1" onClick={props.toggleShowCustomisations}>Customize</button>
                    }
                </div>
            </section>
            {
                (props.showCustomisations) &&
                <TwitchPanelSettings
                    patreonData={props.existingSettingsPayload}
                    onSave={(_) => { }}
                />
            }
        </div>
    );
}
