import React from 'react';
import Marquee from "react-fast-marquee";

import { PatreonTile } from '../../components/patreon/patreonTile';
import { DesignPalette } from '../../constants/designPalette';
import { PatreonItemViewModel } from '../../contracts/generated/ViewModel/patreonItemViewModel';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

interface IProps {
    patronVm: PatreonViewModel;
}

export const PatreonMarquee: React.FC<IProps> = (props: IProps) => {
    const {
        foregroundColour, backgroundColour, backgroundOpacity, marqueSpeed,
        isProfilePicRounded, profilePicRoundedValue
    } = props.patronVm.settings;

    let realValue = +marqueSpeed;
    const selectedValue = DesignPalette.marqueSpeedTicks.find(t => t.value === (+marqueSpeed));
    if (selectedValue != null && selectedValue.realValue != null) realValue = (+selectedValue.realValue);

    const styleObj = {
        backgroundColor: backgroundColour,
        opacity: backgroundOpacity / 100,
    };

    return (
        <div id="patreonMarquee">
            <div className="patreon-container-background" style={styleObj}></div>
            <Marquee gradient={false} className="patreon-container" speed={5 * realValue}>
                {
                    props?.patronVm?.patrons != null &&
                    props.patronVm?.patrons.map((item: PatreonItemViewModel) => (
                        <PatreonTile key={item.name} {...item} foregroundColour={foregroundColour}
                            isProfilePicRounded={isProfilePicRounded} profilePicRoundedValue={profilePicRoundedValue}
                        />
                    ))
                }
            </Marquee>
        </div>
    );
}

