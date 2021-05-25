import React from 'react';
import classNames from 'classnames';
import { Checkbox, FormControlLabel } from '@material-ui/core';

import { PatronLevel } from '../../constants/patreonLevel';
import { DefaultPatreonSettings } from '../../constants/designPalette';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

import { PatreonPanelPresenter } from '../patreon/panel/patreonPanelPresenter';
import { Premium } from '../common/svg/premium';

import { CommonSettings, CommonSettingsFooter } from './commonSettings';

interface IProps {
    patreonData: PatreonViewModel;
    showSaveButton: boolean;
    onSave: () => void;
    editSettings: <T extends unknown>(name: string) => (value: T) => void;
}


export const TwitchPanelSettings: React.FC<IProps> = (props: IProps) => {
    const patronVm = props?.patreonData;
    const patronSettings = patronVm.settings ?? DefaultPatreonSettings;

    const panelUseDefaultBackground = patronSettings?.panelUseDefaultBackground ?? true;
    const premiumLocked = patronVm.premiumLevel < PatronLevel.level1.patreonLevelRequirement;

    return (
        <section id="browser-source-settings" className="main no-border pt0">
            <div className="spotlight">
                <div className="content">
                    <div className="row mb1">
                        <div className="col-12 mb1" >
                            <div style={{ width: '300px', height: '318px', overflow: 'hidden', position: 'relative', margin: '0 auto' }}>
                                <PatreonPanelPresenter
                                    isTestData={false}
                                    patronVm={patronVm}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row mt1 mb2">
                        <CommonSettings
                            patronVm={patronVm}
                            textColourProp="panelForegroundColour"
                            backgroundColourProp="panelBackgroundColour"
                            backgroundOpacityProp="panelBackgroundOpacity"
                            editSettings={props.editSettings}
                        />
                    </div>
                    <hr />
                    <CommonSettingsFooter
                        patronVm={patronVm}
                        isProfilePicRoundedProp="panelIsProfilePicRounded"
                        profilePicRoundedValueProp="panelProfilePicRoundedValue"
                        editSettings={props.editSettings}
                    />
                    <hr className="mt2 mb2" />
                    <div className="row mt2">
                        <div className="col-12">
                            <label className="label">Panel Background</label>

                            <FormControlLabel
                                label="Use default"
                                control={
                                    <Checkbox
                                        checked={panelUseDefaultBackground}
                                        onChange={(_: any) => props.editSettings<boolean>('panelUseDefaultBackground')(!panelUseDefaultBackground)}
                                        name="useDefaulBackground"
                                        color="primary"
                                    />
                                }
                            />

                            {
                                (panelUseDefaultBackground == false) &&
                                <div className={classNames('flex', { 'premium-locked': premiumLocked })}>
                                    <input type="text"
                                        name="border-radius-input"
                                        style={{ display: 'inline-block', width: 'calc(100% - 2em)', marginRight: '1em' }}
                                        value={patronSettings.panelCustomBackgroundImageUrl}
                                        placeholder={'https://i.imgur.com/sKV54PO.jpg'}
                                        onChange={(event: any) => {
                                            event.persist();
                                            const value = event?.target?.value;
                                            props.editSettings<string>('panelCustomBackgroundImageUrl')(value);
                                        }}
                                    />
                                    {
                                        premiumLocked &&
                                        <div className="premium-crown-container">
                                            <Premium classNames="ml1 full-height" />
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <hr className="mt2 mb2" />
                    <div className="ta-center">
                        <div
                            className={classNames('primary button', { disabled: !props.showSaveButton })}
                            onClick={props.onSave}
                        >Save</div>
                    </div>
                </div>
            </div>
        </section>
    );
}