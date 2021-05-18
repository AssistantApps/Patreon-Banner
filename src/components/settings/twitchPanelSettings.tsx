import React from 'react';
import classNames from 'classnames';

import { DefaultPatreonSettings } from '../../constants/designPalette';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

import { PatreonPanelPresenter } from '../patreon/panel/patreonPanelPresenter';

import { CommonSettings } from './commonSettings';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { Lock } from '../common/svg/lock';

interface IProps {
    patreonData: PatreonViewModel;
    showSaveButton: boolean;
    onSave: () => void;
    editSettings: <T extends unknown>(name: string) => (value: T) => void;
}


export const TwitchPanelSettings: React.FC<IProps> = (props: IProps) => {
    const patronVm = props?.patreonData;
    const patronSettings = patronVm.settings ?? DefaultPatreonSettings;

    return (
        <section id="browser-source-settings" className="main pt3">
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
                        <CommonSettings patronVm={patronVm} editSettings={props.editSettings} />
                    </div>
                    <hr />
                    <div className="row mt2">
                        <div className="col-12">
                            <label>Panel Background</label>

                            <FormControlLabel
                                label="Use default"
                                control={
                                    <Checkbox
                                        checked={patronSettings.panelUseDefaultBackground}
                                        onChange={(_: any) => props.editSettings<boolean>('panelUseDefaultBackground')(!patronSettings.panelUseDefaultBackground)}
                                        name="useDefaulBackground"
                                        color="primary"
                                    />
                                }
                            />

                            {
                                (patronSettings.panelUseDefaultBackground == false) &&
                                <div className={classNames({ 'premium-locked': !patronVm.isPremium })}>
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
                                    <Lock classNames="ml1" />
                                    {
                                        (patronVm.isPremium == false) &&
                                        <Lock classNames="ml1" />
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