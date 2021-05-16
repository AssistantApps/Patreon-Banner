import React from 'react';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Checkbox } from '@material-ui/core';
import { sha1 } from 'object-hash'

import { DisplayType } from '../../constants/enum/displayType';
import { DefaultPatreonSettings, DesignPalette } from '../../constants/designPalette';
import { displayTypeCheckBoxes } from '../../constants/patreon';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

import { ColourPicker } from '../../components/common/colourPicker/colourPicker'
import { Footer } from '../../components/common/footer'
import { BasicImage } from '../../components/core/image';
import { PatreonMarquee } from '../../components/patreon/patreonMarquee';
import { PatreonVerticalList } from '../../components/patreon/patreonVerticalList';
import { PatreonOneAtATime } from '../../components/patreon/patreonOneAtATime';
import { SpeedPicker } from '../../components/common/slider/speedPicker';
import { DefaultTooltip } from '../../components/common/tooltip/tooltip';

import { PatreonSettingsViewModel } from '../../contracts/generated/ViewModel/patreonSettingsViewModel';
import classNames from 'classnames';
import { CommonSettings, CommonSettingsFooter } from './commonSettings';
import { PatreonPanelPresenter } from '../patreon/panel/patreonPanelPresenter';


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
        const showSave = (this.state.propSettingsHash != this.state.settingsHash);

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

                        <div className="row mb1">
                            <CommonSettings patronVm={patronVm} editSettings={this.editSettings} />
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
