import React from 'react';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@material-ui/core';

import { AppImage } from '../../constants/appImage';
import { DisplayType } from '../../constants/enum/displayType';
import { ColourPalette } from '../../constants/colourPalette';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

import { ColourPicker } from '../../components/common/colourPicker/colourPicker'
import { Footer } from '../../components/common/footer'
import { BasicImage } from '../../components/core/image';
import { PatreonMarquee } from '../../components/patreon/patreonMarquee';
import { PatreonVerticalList } from '../../components/patreon/patreonVerticalList';
import { PatreonOneAtATime } from '../../components/patreon/patreonOneAtATime';
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
        settings: {
            foregroundColour: props.settings.foregroundColour,
            backgroundColour: props.settings.backgroundColour,
        }
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
                            <hr className="mt0 mb1" />
                            <div className="row">
                                <div className="col-6">
                                    <label>Text Colour</label>
                                    <ColourPicker
                                        id="foregroundColour"
                                        defaultValue={ColourPalette.foregroundDefault}
                                        currentValue={props.settings.foregroundColour}
                                        availableColours={ColourPalette.foregroundOptions}
                                        onChange={props.editSettings('foregroundColour')}
                                    />
                                </div>
                                <div className="col-6">
                                    <label>Background Colour</label>
                                    <ColourPicker
                                        id="backgroundColour"
                                        defaultValue={ColourPalette.backgroundDefault}
                                        currentValue={props.settings.backgroundColour}
                                        availableColours={ColourPalette.backgroundOptions}
                                        onChange={props.editSettings('backgroundColour')}
                                    />
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
