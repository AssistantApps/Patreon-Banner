import React from 'react';
import { FormControlLabel, FormControl, RadioGroup, Radio } from '@material-ui/core';
import { sha1 } from 'object-hash'

import { DefaultPatreonSettings, DesignPalette } from '../../constants/designPalette';
import { PatreonBannerDisplayType } from '../../contracts/generated/Enum/patreonBannerDisplayType';
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


interface IProps {
    patreonData: PatreonViewModel;
    showSaveButton: boolean;
    onSave: () => void;
    editSettings: <T extends unknown>(name: string) => (value: T) => void;
}

export const BrowserSourceSettings: React.FC<IProps> = (props: IProps) => {
    const patronVm = props?.patreonData;
    const patronSettings = patronVm.settings ?? DefaultPatreonSettings;

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
                                            onClick={() => props.editSettings('displayType')(cBoxDetails.displayType)}
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
                            patronSettings.displayType === PatreonBannerDisplayType.marque &&
                            <div className="display-test-marquee">
                                <PatreonMarquee patronVm={patronVm} />
                            </div>
                        }
                        {
                            patronSettings.displayType === PatreonBannerDisplayType.verticalList &&
                            <div className="display-test-list">
                                <PatreonVerticalList patronVm={patronVm} />
                            </div>
                        }
                        {
                            patronSettings.displayType === PatreonBannerDisplayType.oneAtATime &&
                            <div className="display-test-one-at-a-time">
                                <PatreonOneAtATime patronVm={patronVm} />
                            </div>
                        }
                    </div>
                    <div className="row mt2 mb1">
                        <CommonSettings patronVm={patronVm} editSettings={props.editSettings} />
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-12">
                            {
                                patronSettings.displayType === PatreonBannerDisplayType.marque &&
                                <div className="mt1">
                                    <label>Speed of Patrons scrolling</label>
                                    <SpeedPicker
                                        className="ph3"
                                        availableTicks={DesignPalette.marqueSpeedTicks}
                                        value={patronSettings.marqueSpeed}
                                        valueLabelDisplay="off"
                                        onChange={(newValue: number) => props.editSettings('marqueSpeed')(newValue.toString())}
                                    />
                                </div>
                            }
                            {
                                patronSettings.displayType === PatreonBannerDisplayType.verticalList &&
                                <div className="mt1">
                                    <label>Time per Patron <DefaultTooltip message="Duration of list animation = (time per patron) x (number of patrons)"></DefaultTooltip></label>
                                    <SpeedPicker
                                        className="ph3"
                                        availableTicks={DesignPalette.verticalListSpeedTicks}
                                        value={patronSettings.verticalListSpeed}
                                        valueLabelDisplay="off"
                                        onChange={(newValue: number) => props.editSettings('verticalListSpeed')(newValue.toString())}
                                    />
                                </div>
                            }
                            {
                                patronSettings.displayType === PatreonBannerDisplayType.oneAtATime &&
                                <div className="mt1">
                                    <label>Time on screen per Patron</label>
                                    <SpeedPicker
                                        className="ph3"
                                        availableTicks={DesignPalette.oneAtATimeSpeedTicks}
                                        value={patronSettings.oneAtATimeSpeed}
                                        valueLabelDisplay="off"
                                        onChange={props.editSettings<number>('oneAtATimeSpeed')}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                    <hr />
                    <CommonSettingsFooter patronVm={patronVm} editSettings={props.editSettings} />
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
