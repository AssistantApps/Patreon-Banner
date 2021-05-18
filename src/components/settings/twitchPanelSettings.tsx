import React from 'react';
import { sha1 } from 'object-hash'
import classNames from 'classnames';

import { DefaultPatreonSettings } from '../../constants/designPalette';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';
import { PatreonSettingsViewModel } from '../../contracts/generated/ViewModel/patreonSettingsViewModel';

import { PatreonPanelPresenter } from '../patreon/panel/patreonPanelPresenter';

import { CommonSettings } from './commonSettings';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { Lock } from '../common/svg/lock';


interface IState {
    settings: PatreonSettingsViewModel;
    propSettingsHash: string;
    settingsHash: string;
}

interface IProps {
    patreonData: PatreonViewModel;
    onSave: (settings: PatreonSettingsViewModel) => void
}

export class TwitchPanelSettings extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const settings = props?.patreonData?.settings ?? DefaultPatreonSettings;

        this.state = {
            settings: DefaultPatreonSettings,
            propSettingsHash: sha1(settings),
            settingsHash: sha1(settings),
        }
    }

    editSettings = <T extends unknown>(name: string) => (value: T) => {
        this.setState((prevState: IState) => {
            const settings: PatreonSettingsViewModel = {
                ...prevState.settings,
                [name]: value
            };

            return {
                settings,
                settingsHash: sha1(settings),
            }
        });
    }

    save = () => {
        this.props?.onSave?.(this.state.settings)
    }

    render() {
        const patronVm = {
            ...this.props.patreonData,
            settings: {
                ...this.props.patreonData.settings,
                ...this.state.settings
            }
        }
        const { settings } = patronVm;
        const showSave = (this.state.propSettingsHash != this.state.settingsHash);

        /*
        panelUseDefaultBackground
panelCustomBackgroundImageUrl
*/

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
                            <CommonSettings patronVm={patronVm} editSettings={this.editSettings} />
                        </div>
                        <hr />
                        <div className="row mt2">
                            <div className="col-12">
                                <label>Panel Background</label>

                                <FormControlLabel
                                    label="Use default"
                                    control={
                                        <Checkbox
                                            checked={settings.panelUseDefaultBackground}
                                            onChange={(_: any) => this.editSettings<boolean>('panelUseDefaultBackground')(!settings.panelUseDefaultBackground)}
                                            name="useDefaulBackground"
                                            color="primary"
                                        />
                                    }
                                />

                                {
                                    (settings.panelUseDefaultBackground == false) &&
                                    <div className={classNames({ 'premium-locked': !patronVm.isPremium })}>
                                        <input type="text"
                                            name="border-radius-input"
                                            style={{ display: 'inline-block', width: 'calc(100% - 2em)', marginRight: '1em' }}
                                            value={settings.panelCustomBackgroundImageUrl}
                                            placeholder={'https://i.imgur.com/sKV54PO.jpg'}
                                            onChange={(event: any) => {
                                                event.persist();
                                                const value = event?.target?.value;
                                                this.editSettings<string>('panelCustomBackgroundImageUrl')(value);
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
                                className={classNames('primary button', { disabled: !showSave })}
                                onClick={this.save}
                            >Save</div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
