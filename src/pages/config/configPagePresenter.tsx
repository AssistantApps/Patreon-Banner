import React from 'react';
import moment from 'moment';

import { Loading } from '../../components/loading';
import { Footer } from '../../components/common/footer'
import { TextInput } from '../../components/common/form/textInput';
import { SegmentedControl } from '../../components/common/segmentedControl/segmentedControl';
import { PatreonButton } from '../../components/patreon/patreonButton';
import { BrowserSourceSettings } from '../../components/settings/browserSourceSettings';
import { TwitchPanelSettings } from '../../components/settings/twitchPanelSettings';

import { NetworkState } from '../../constants/enum/networkState';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

import { getDisplayUrl } from '../../helper/configHelper';
import { patronOAuthUrl } from '../../integration/patreonOAuth';

import { IExpectedServices } from './configPage.dependencyInjection';
import { PatreonSettingsViewModel } from '../../contracts/generated/ViewModel/patreonSettingsViewModel';


/* TODO - Undo display none when enabling settings feature */
const enableCustomizationsFeature = true;

export interface IConfigPagePresenterProps {
    fetchExistingStatus: NetworkState;
    existingSettingsPayload: PatreonViewModel;

    showSaveButton: boolean;

    showCustomisations: boolean;
    customisationTabIndex: number;

    toggleShowCustomisations: () => void;
    setCustomisationTabIndex: (newCustomisationTabIndex: number) => void;
    editSettings: <T extends unknown>(name: string) => (value: T) => void;
    saveSettings: () => void;
}

interface IProps extends IConfigPagePresenterProps, IExpectedServices { }

export const ConfigPagePresenter: React.FC<IProps> = (props: IProps) => {
    if (props.fetchExistingStatus === NetworkState.Loading) {
        return (
            <Loading />
        );
    }

    const renderStatusSection = (localProps: IProps) => {
        if (localProps.fetchExistingStatus === NetworkState.Success && localProps.existingSettingsPayload.patrons != null) {
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
                Please login with Patreon to change your settings. <br />
            </p>
        );
    }

    const existingFetchSuccessful = props.fetchExistingStatus === NetworkState.Success;
    const userDisplayUrl = getDisplayUrl(props.existingSettingsPayload?.userGuid);
    const hasUserConfig = existingFetchSuccessful && props.existingSettingsPayload && props.existingSettingsPayload.userGuid;
    const showBrowserSourceSettings = (props.showCustomisations && props.fetchExistingStatus === NetworkState.Success && props.existingSettingsPayload.patrons != null && props.customisationTabIndex === 0);

    const styleObj: any = {};
    if (props.showCustomisations) {
        styleObj.paddingBottom = '2em';
    }

    return (
        <div className="wrapper pt5">
            <div id="main">
                <section id="config" className="main" style={styleObj}>
                    <div className="spotlight">
                        <div className="content">
                            <header className="major">
                                <h2>Config</h2>
                            </header>
                            {renderStatusSection(props)}

                            {
                                (existingFetchSuccessful === false)
                                    ? <PatreonButton onClick={() => {
                                        const url = patronOAuthUrl();
                                        props.loggingService?.log('url', url);
                                        window.location.href = url;
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
                    <div className="ta-center" style={{ display: enableCustomizationsFeature ? undefined : 'none' }}>
                        {
                            (props.showCustomisations === false && hasUserConfig) &&
                            <button className="primary button mt1" onClick={props.toggleShowCustomisations}>Customize</button>
                        }
                        {
                            (props.showCustomisations && hasUserConfig/* && props.existingSettingsPayload.hasTwitch*/) &&
                            <SegmentedControl
                                options={[{ label: 'Browser Source settings', value: 0 }, { label: 'Twitch Panel settings', value: 1 }]}
                                onChange={props.setCustomisationTabIndex}
                            />
                        }
                    </div>
                </section>
                {
                    props.showCustomisations &&
                    <>
                        {
                            showBrowserSourceSettings
                                ? <BrowserSourceSettings
                                    patreonData={props.existingSettingsPayload}
                                    showSaveButton={props.showSaveButton}
                                    editSettings={props.editSettings}
                                    onSave={props.saveSettings}
                                />
                                : <TwitchPanelSettings
                                    patreonData={props.existingSettingsPayload}
                                    showSaveButton={props.showSaveButton}
                                    editSettings={props.editSettings}
                                    onSave={props.saveSettings}
                                />
                        }
                    </>
                }
            </div>

            <Footer />
        </div>
    );
}
