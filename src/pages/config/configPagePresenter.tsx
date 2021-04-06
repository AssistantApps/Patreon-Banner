import React from 'react';
import classNames from 'classnames';

import { BasicLink } from '../../components/core/link';
import { TextInput } from '../../components/common/form/textInput';
import { ErrorMessageList } from '../../components/common/validation/errorMessageList';
import { SmallLoading, TinyLoading } from '../../components/loading';
import { NetworkState } from '../../constants/enum/networkState';
import { isAccessTokenValid, isCampaignIdValid, isFormValid } from './configPageValidations';
import { defaultSuccessResult } from '../../contracts/results/ResultWithValue';

export interface IConfigPageContainerProps {
    editFormValues: (propName: string, propValue: string) => void;
    submitConfigForm: () => void;
}

export interface IConfigPagePresenterProps {
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
}

interface IProps extends IConfigPagePresenterProps, IConfigPageContainerProps { }

export const ConfigPagePresenter: React.FC<IProps> = (props: IProps) => {
    if (props.twitchStatus === NetworkState.Loading ||
        props.fetchExistingStatus === NetworkState.Loading) {
        return (<SmallLoading />);
    }

    const onChangeEvent = (name: string) => (value: string) => props.editFormValues?.(name, value);

    const renderStatusSection = (localProps: IProps) => {
        if (localProps.fetchExistingStatus === NetworkState.Success) {
            return (
                <p>
                    <i>{localProps.existingSettingsPayload.numPatreons} Patreons loaded </i>🚀
                    <br />
                    <i>Last refresh: {localProps.existingSettingsPayload.lastRefresh}</i>
                    <br />
                    <p style={{ fontWeight: 'bold' }}>No changes needed, you can close this window</p>
                </p>
            );
        }

        return (
            <p>
                <span>These two values are required in order to fetch the list of Patrons from <BasicLink href="https://patreon.com">Patreon.com</BasicLink>.</span><br />
                <i>No settings found for your Twitch account. Please fill in the form below.</i>
            </p>
        );
    }

    const isFormValidResult = props.showFormValidation
        ? isFormValid(props)
        : defaultSuccessResult;

    return (
        <div id="main">
            <section id="config" className="main" style={{ padding: '1em 2em' }}>
                <div className="spotlight">
                    <div className="content">
                        <header className="major">
                            <h2>Configuration</h2>
                        </header>
                        {renderStatusSection(props)}

                        <div className="row gtr-uniform">
                            <div className="col-12 col-12-xsmall">
                                <TextInput
                                    key="accessToken"
                                    id="config-accessToken"
                                    name="accessToken"
                                    label="Access Token"
                                    value={props.accessToken}
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
                                    value={props.campaignId}
                                    pattern="[a-Z]"
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
                                                ? <div className="button primary disabled"><TinyLoading /></div>
                                                : (
                                                    <>
                                                        <input
                                                            type="submit"
                                                            value="Fetch my Patreon Supporters List"
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
                </div>
            </section>
        </div>
    );
}
