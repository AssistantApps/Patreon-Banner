import React from 'react';
import { FormControlLabel, Checkbox, FormControl, FormLabel, RadioGroup, Radio } from '@material-ui/core';
import { sha1 } from 'object-hash'

import { DisplayType } from '../../constants/enum/displayType';
import { DefaultPatreonSettings, DesignPalette } from '../../constants/designPalette';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

import { SpeedPicker } from '../common/slider/speedPicker';
import { DefaultTooltip } from '../common/tooltip/tooltip';
import { CommonSettings, CommonSettingsFooter } from './commonSettings';

import { PatreonSettingsViewModel } from '../../contracts/generated/ViewModel/patreonSettingsViewModel';
import classNames from 'classnames';
import { displayTypeCheckBoxes } from '../../constants/patreon';
import { BasicImage } from '../core/image';
import { PatreonMarquee } from '../patreon/patreonMarquee';
import { PatreonVerticalList } from '../patreon/patreonVerticalList';
import { PatreonOneAtATime } from '../patreon/patreonOneAtATime';


interface IState {
    settings: PatreonSettingsViewModel;
    propSettingsHash: string;
    settingsHash: string;
}

interface IProps {
    patreonData: PatreonViewModel;
    onSave: (settings: PatreonSettingsViewModel) => void
}

export class BrowserSourceSettings extends React.Component<IProps, IState> {
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
        const patronVm: PatreonViewModel = {
            ...this.props.patreonData,
            settings: {
                ...this.props.patreonData.settings,
                ...this.state.settings
            }
        }
        const patronSettings = patronVm.settings;

        const showSave = (this.state.propSettingsHash != this.state.settingsHash);

        return (
            <section id="browser-source-settings" className="main pt1">
                <div className="spotlight">
                    <div className="content">
                        <FormControl component="fieldset" style={{ width: '100%' }}>
                            <RadioGroup row aria-label="position" name="position" defaultValue="top" className="mt1">
                                {
                                    displayTypeCheckBoxes.map((cBoxDetails: any) => {
                                        const radioComp = (
                                            <Radio
                                                color="primary"
                                                checked={cBoxDetails.displayType === patronSettings.displayType}
                                            />
                                        );
                                        const labelComp = (
                                            <BasicImage
                                                imageUrl={cBoxDetails.imageUrl}
                                                classNames="display-type"
                                            />
                                        )
                                        return (
                                            <FormControlLabel
                                                key={`option-${cBoxDetails.displayType}`}
                                                labelPlacement="bottom"
                                                control={radioComp}
                                                label={labelComp}
                                                onClick={() => this.editSettings('displayType')(cBoxDetails.displayType)}
                                            />
                                        );
                                    })
                                }
                            </RadioGroup>
                        </FormControl>
                        <div className="display-test">
                            <div className="display-test-inner">
                                <h2 className="m0">Your awesome stream!</h2>
                            </div>
                            {
                                patronSettings.displayType === DisplayType.Marquee &&
                                <div className="display-test-marquee">
                                    <PatreonMarquee patronVm={patronVm} />
                                </div>
                            }
                            {
                                patronSettings.displayType === DisplayType.VerticalList &&
                                <div className="display-test-list">
                                    <PatreonVerticalList patronVm={patronVm} />
                                </div>
                            }
                            {
                                patronSettings.displayType === DisplayType.OneAtATime &&
                                <div className="display-test-one-at-a-time">
                                    <PatreonOneAtATime patronVm={patronVm} />
                                </div>
                            }
                        </div>
                        <div className="row mt2 mb1">
                            <CommonSettings patronVm={patronVm} editSettings={this.editSettings} />
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-12">
                                {
                                    patronSettings.displayType === DisplayType.Marquee &&
                                    <div className="mt1">
                                        <label>Speed of Patrons scrolling</label>
                                        <SpeedPicker
                                            className="ph3"
                                            availableTicks={DesignPalette.marqueSpeedTicks}
                                            value={patronSettings.marqueSpeed}
                                            valueLabelDisplay="off"
                                            onChange={(newValue: number) => this.editSettings('marqueSpeed')(newValue.toString())}
                                        />
                                    </div>
                                }
                                {
                                    patronSettings.displayType === DisplayType.VerticalList &&
                                    <div className="mt1">
                                        <label>Time per Patron <DefaultTooltip message="Duration of list animation = (time per patron) x (number of patrons)"></DefaultTooltip></label>
                                        <SpeedPicker
                                            className="ph3"
                                            availableTicks={DesignPalette.verticalListSpeedTicks}
                                            value={patronSettings.verticalListSpeed}
                                            valueLabelDisplay="off"
                                            onChange={(newValue: number) => this.editSettings('verticalListSpeed')(newValue.toString())}
                                        />
                                    </div>
                                }
                                {
                                    patronSettings.displayType === DisplayType.OneAtATime &&
                                    <div className="mt1">
                                        <label>Time on screen per Patron</label>
                                        <SpeedPicker
                                            className="ph3"
                                            availableTicks={DesignPalette.oneAtATimeSpeedTicks}
                                            value={patronSettings.oneAtATimeSpeed}
                                            valueLabelDisplay="off"
                                            onChange={this.editSettings<number>('oneAtATimeSpeed')}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                        <hr />
                        <CommonSettingsFooter patronVm={patronVm} editSettings={this.editSettings} />
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
