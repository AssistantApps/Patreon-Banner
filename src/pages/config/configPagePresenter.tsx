import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

import { BasicLink } from '../../components/core/link';
import { TextInput } from '../../components/common/form/textInput';
import { SmallLoading } from '../../components/loading';
import { PatreonButton } from '../../components/patreon/patreonButton';
import { NetworkState } from '../../constants/enum/networkState';
import { TwitchConfigViewModel } from '../../contracts/generated/ViewModel/twitchConfigViewModel';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';
import { getDisplayUrl } from '../../helper/configHelper';
import { patronOAuthUrl } from '../../integration/patreonOAuth';

import { IExpectedServices } from './configPage.dependencyInjection';
import CopyToClipboard from 'react-copy-to-clipboard';

export interface IConfigPageContainerProps {
    editFormValues: (propName: string, propValue: string) => void;
    submitConfigForm: () => void;
    toggleAdvancedMode: (newValue?: boolean) => void;
}

export interface IConfigPagePresenterProps {
    fetchExistingStatus: NetworkState;
    existingSettingsPayload: PatreonViewModel;

    submissionData: TwitchConfigViewModel;
    submissionStatus: NetworkState;
    showFormValidation: boolean;

    showAdvanced: boolean;

    // Twitch
    twitch: any;
    twitchTheme: string;
    twitchStatus: NetworkState;
}

interface IProps extends IConfigPagePresenterProps, IConfigPageContainerProps, IExpectedServices { }

export const ConfigPagePresenter: React.FC<IProps> = (props: IProps) => {
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

    const onChangeEvent = (name: string) => (value: string) => props.editFormValues?.(name, value);

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
                    localProps.showAdvanced &&
                    <span>Please fill in the form below.These two values are required in order to fetch the list of Patrons from <BasicLink href="https://patreon.com">Patreon.com</BasicLink>.</span>
                }
            </p>
        );
    }

    // const isFormValidResult = props.showFormValidation
    //     ? isFormValid(props)
    //     : defaultSuccessResult;

    const existingFetchSuccessful = props.fetchExistingStatus === NetworkState.Success;
    const showPatreonLoginButton = props.showAdvanced == false && existingFetchSuccessful == false;
    const userDisplayUrl = getDisplayUrl(props.existingSettingsPayload?.twitchUserGuid);

    return (
        <div id="main" className={classNames('twitch', props.twitchTheme)}>
            <section id="config" className="main" style={{ paddingTop: '1em' }}>
                <div className="spotlight">
                    <div className="content">
                        {renderStatusSection(props)}

                        {
                            showPatreonLoginButton &&
                            <PatreonButton onClick={() => {
                                props.oAuthClient.joinGroup(props.submissionData.channelId);
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

                        {/* <div className={classNames({ 'mt1': !props.showAdvanced })}>
                            <BasicLink href="#"
                                additionalClassNames="twitch"
                                onClick={() => props.toggleAdvancedMode?.()}>
                                <span>{props.showAdvanced ? 'Hide' : 'Show'}&nbsp;advanced</span>
                            </BasicLink>
                        </div> */}

                        {/* {
                            props.showAdvanced &&
                            <div className="mt1">
                                <div className="row gtr-uniform">
                                    <div className="col-12 col-12-xsmall">
                                        <TextInput
                                            key="accessToken"
                                            id="config-accessToken"
                                            name="accessToken"
                                            label="Access Token"
                                            value={props.submissionData.accessToken}
                                            onChange={onChangeEvent('accessToken')}
                                            placeholder="AAAaBb0bbCCCc11DddE22EEEeFFF_ABCD"
                                            isValid={() => isAccessTokenValid(props, true)}
                                            showValidation={props.showFormValidation}
                                        />
                                    </div>
                                    <div className="col-12 col-12-xsmall">
                                        <TextInput
                                            key="campaignId"
                                            id="config-campaignId"
                                            name="campaignId"
                                            label="Campaign Id"
                                            value={props.submissionData.campaignId}
                                            pattern="[a-zA-Z]"
                                            onChange={onChangeEvent('campaignId')}
                                            placeholder="1234567"
                                            isValid={() => isCampaignIdValid(props, true)}
                                            showValidation={props.showFormValidation}
                                        />
                                    </div>
                                    <div className="col-12 col-12-xsmall">
                                        <i style={{ fontSize: '70%' }}>We need these values to make requests to the Patreon API on your behalf.</i>
                                        <ul>
                                            <li><i style={{ fontSize: '70%' }}>We do not collect any data from you Patreon supporters.</i></li>
                                            <li><i style={{ fontSize: '70%' }}>These values securely in your database, encrypted.</i></li>
                                        </ul>
                                    </div>
                                    <div className="col-12">
                                        <ul className="actions">
                                            <li>
                                                {
                                                    props.submissionStatus === NetworkState.Loading
                                                        ? <div className="button primary no-click"><TinyLoading /></div>
                                                        : (
                                                            <>
                                                                <input
                                                                    type="submit"
                                                                    value="Fetch my Patreon Supporters list"
                                                                    className={classNames('primary', { disabled: !isFormValidResult.isSuccess })}
                                                                    onClick={props.submitConfigForm}
                                                                />
                                                                <ErrorMessageList {...isFormValidResult} />
                                                            </>
                                                        )
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        } */}
                    </div>
                </div>
            </section>
        </div>
    );
}
