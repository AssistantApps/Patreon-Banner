import React from 'react';
import moment from 'moment';

import { Header } from '../../components/common/header';
import { Navbar } from '../../components/common/navbar';
import { Footer } from '../../components/common/footer'
import { TextInput } from '../../components/common/form/textInput';
import { SmallLoading } from '../../components/loading';
import { PatreonButton } from '../../components/patreon/patreonButton';
import { NetworkState } from '../../constants/enum/networkState';
import { TwitchConfigViewModel } from '../../contracts/generated/ViewModel/twitchConfigViewModel';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

import { getDisplayUrl } from '../../helper/configHelper';
import { patronOAuthUrl } from '../../integration/patreonOAuth';

import { IExpectedServices } from './configPage.dependencyInjection';

export interface IConfigPagePresenterProps {
    fetchExistingStatus: NetworkState;
    existingSettingsPayload: PatreonViewModel;

    submissionData: TwitchConfigViewModel;
    submissionStatus: NetworkState;
}

interface IProps extends IConfigPagePresenterProps, IExpectedServices { }

export const ConfigPagePresenter: React.FC<IProps> = (props: IProps) => {
    if (
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
            </p>
        );
    }

    const existingFetchSuccessful = props.fetchExistingStatus === NetworkState.Success;
    const showPatreonLoginButton = existingFetchSuccessful == false;
    const userDisplayUrl = getDisplayUrl(props.existingSettingsPayload?.twitchUserGuid);

    return (
        <div className="bg">
            <div className="wrapper pt5">
                <div id="main">
                    <section id="config" className="main">
                        <div className="spotlight">
                            <div className="content">
                                <header className="major">
                                    <h2>Config</h2>
                                </header>
                                {renderStatusSection(props)}

                                {
                                    showPatreonLoginButton &&
                                    <PatreonButton onClick={() => {
                                        const url = patronOAuthUrl(props.submissionData);
                                        props.loggingService?.log('url', url);
                                        window.open(url, "mywindow", "resizable=1,width=800,height=800");
                                    }} />
                                }

                                {
                                    existingFetchSuccessful &&
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
                                            style={{ position: 'absolute', top: '1.45rem', right: '0.1rem' }}
                                        ></a>
                                    </div>
                                }
                            </div>
                        </div>
                    </section>
                </div>

                <Footer />
            </div>
        </div>
    );
}
