import React from 'react';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@material-ui/core';

import { AppImage } from '../../constants/appImage';
import { DisplayType } from '../../constants/enum/displayType';
import { patreonTestData } from '../../constants/testData/patreonTestData';

import { Footer } from '../../components/common/footer'
import { BasicImage } from '../../components/core/image';
import { PatreonMarquee } from '../../components/patreon/patreonMarquee';

interface IContainerProps {
    setDisplayType: (displayType: DisplayType) => void
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
    ]

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
                                        <PatreonMarquee patronSettings={patreonTestData().value} />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
}
