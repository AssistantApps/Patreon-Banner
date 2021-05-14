import React from 'react';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, FormGroup, Checkbox } from '@material-ui/core';

import { AppImage } from '../../constants/appImage';
import { DisplayType } from '../../constants/enum/displayType';
import { DesignPalette } from '../../constants/designPalette';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

import { ColourPicker } from '../../components/common/colourPicker/colourPicker'
import { Footer } from '../../components/common/footer'
import { BasicImage } from '../../components/core/image';
import { PatreonMarquee } from '../../components/patreon/patreonMarquee';
import { PatreonVerticalList } from '../../components/patreon/patreonVerticalList';
import { PatreonOneAtATime } from '../../components/patreon/patreonOneAtATime';
import { SpeedPicker } from '../../components/common/slider/speedPicker';
import { DefaultTooltip } from '../../components/common/tooltip/tooltip';
import { PatreonTile } from '../../components/patreon/patreonTile';

import { PatreonSettingsViewModel } from '../../contracts/generated/ViewModel/patreonSettingsViewModel';

interface IContainerProps {
    testData: PatreonViewModel;
    settings: PatreonSettingsViewModel;
    setDisplayType: (displayType: DisplayType) => void;
    editSettings: (name: string) => (value: string) => void;
}

interface IProps extends IContainerProps {
    displayType: DisplayType;
}

export const ExamplePagePresenter: React.FC<IProps> = (props: IProps) => {

    const displayTypeCheckBoxes = [
        {
            imageUrl: `/${AppImage.displayTypeMarquee}`,
            displayType: DisplayType.Marquee,
        },
        {
            imageUrl: `/${AppImage.displayTypeVerticalList}`,
            displayType: DisplayType.VerticalList,
        },
        {
            imageUrl: `/${AppImage.displayTypeOneAtATime}`,
            displayType: DisplayType.OneAtATime,
        }
    ];

    const patronSettings = {
        ...props.testData,
        settings: { ...props.settings }
    }

    return (
        <div className="wrapper pt5">
            <div id="main">
                <section id="example" className="main">
                    <div className="spotlight">
                        <div className="content">
                            <header className="major">
                                <h2>Example</h2>
                            </header>
                            <FormControl component="fieldset" style={{ width: '100%' }}>
                                <FormLabel component="legend">Type of Display</FormLabel>
                                <RadioGroup row aria-label="position" name="position" defaultValue="top" className="mt1">
                                    {
                                        displayTypeCheckBoxes.map((cBoxDetails: any) => {
                                            const radioComp = (
                                                <Radio
                                                    color="primary"
                                                    checked={cBoxDetails.displayType === props.displayType}
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
                                                    onClick={() => props.setDisplayType(cBoxDetails.displayType)}
                                                />
                                            );
                                        })
                                    }
                                </RadioGroup>
                            </FormControl>
                            <hr className="mt0 mb1" />
                            <div className="display-test">
                                <div className="display-test-inner">
                                    <h2 className="m0">Your awesome stream!</h2>
                                </div>
                                {
                                    props.displayType === DisplayType.Marquee &&
                                    <div className="display-test-marquee">
                                        <PatreonMarquee patronSettings={patronSettings} />
                                    </div>
                                }
                                {
                                    props.displayType === DisplayType.VerticalList &&
                                    <div className="display-test-list">
                                        <PatreonVerticalList patronSettings={patronSettings} />
                                    </div>
                                }
                                {
                                    props.displayType === DisplayType.OneAtATime &&
                                    <div className="display-test-one-at-a-time">
                                        <PatreonOneAtATime patronSettings={patronSettings} />
                                    </div>
                                }
                            </div>
                            <div className="row mt3 mb1">
                                <div className="col-6">
                                    <label>Text Colour</label>
                                    <ColourPicker
                                        id="foregroundColour"
                                        defaultValue={DesignPalette.foregroundDefault}
                                        currentValue={props.settings.foregroundColour}
                                        availableColours={DesignPalette.foregroundOptions}
                                        onChange={props.editSettings('foregroundColour')}
                                    />
                                </div>
                                <div className="col-6">
                                    <label>Background Colour</label>
                                    <ColourPicker
                                        id="backgroundColour"
                                        defaultValue={DesignPalette.backgroundDefault}
                                        currentValue={props.settings.backgroundColour}
                                        availableColours={DesignPalette.backgroundOptions}
                                        onChange={props.editSettings('backgroundColour')}
                                    />
                                    <div className="mt1">
                                        <label>Background Opacity</label>
                                        <SpeedPicker
                                            min={DesignPalette.backgroundOpacityMin}
                                            max={DesignPalette.backgroundOpacityMax}
                                            value={props.settings.backgroundOpacity}
                                            onChange={(newValue: number) => props.editSettings('backgroundOpacity')(newValue.toString())}
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-12">
                                    {
                                        props.displayType === DisplayType.Marquee &&
                                        <div className="mt1">
                                            <label>Speed of Patrons scrolling</label>
                                            <SpeedPicker
                                                className="ph3"
                                                availableTicks={DesignPalette.marqueSpeedTicks}
                                                value={props.settings.marqueSpeed}
                                                valueLabelDisplay="off"
                                                onChange={(newValue: number) => props.editSettings('marqueSpeed')(newValue.toString())}
                                            />
                                        </div>
                                    }
                                    {
                                        props.displayType === DisplayType.VerticalList &&
                                        <div className="mt1">
                                            <label>Time per Patron <DefaultTooltip message="Duration of list animation = (time per patron) x (number of patrons)"></DefaultTooltip></label>
                                            <SpeedPicker
                                                className="ph3"
                                                availableTicks={DesignPalette.verticalListSpeedTicks}
                                                value={props.settings.verticalListSpeed}
                                                valueLabelDisplay="off"
                                                onChange={(newValue: number) => props.editSettings('verticalListSpeed')(newValue.toString())}
                                            />
                                        </div>
                                    }
                                    {
                                        props.displayType === DisplayType.OneAtATime &&
                                        <div className="mt1">
                                            <label>Time on screen per Patron</label>
                                            <SpeedPicker
                                                className="ph3"
                                                availableTicks={DesignPalette.oneAtATimeSpeedTicks}
                                                value={props.settings.oneAtATimeSpeed}
                                                valueLabelDisplay="off"
                                                onChange={(newValue: number) => props.editSettings('oneAtATimeSpeed')(newValue.toString())}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                            <hr />
                            <div className="row mt2">
                                <div className="col-12">
                                    <label>Profile picture settings</label>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={props.settings.isProfilePicRounded}
                                                onChange={(_) => { }}
                                                name="hasRoundedProfilePics"
                                                color="primary"
                                            />
                                        }
                                        label="Rounded profile pictures"
                                    />
                                    {
                                        props.settings.isProfilePicRounded &&
                                        <input type="number"
                                            min={0}
                                            max={100}
                                            name="border-radius-input"
                                            style={{ display: 'inline-block', width: 'unset' }}
                                            value={'25'}
                                            placeholder={'pickerCurrentValue'}
                                            onChange={(event: any) => {
                                                event.persist();
                                                const value = event?.target?.value ?? '';
                                            }}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
}
