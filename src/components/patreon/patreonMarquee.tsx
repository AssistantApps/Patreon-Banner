import React from 'react';
import Marquee from "react-fast-marquee";

import { PatreonTile } from '../../components/patreon/patreonTile';
import { DesignPalette } from '../../constants/designPalette';
import { PatreonItemViewModel } from '../../contracts/generated/ViewModel/patreonItemViewModel';

interface IMarqueeRequiredSettingsProps {
    foregroundColour: string;
    backgroundColour: string;
    backgroundOpacity: number;
    marqueSpeed: number;
    isProfilePicRounded: boolean;
    profilePicRoundedValue: number;

}
interface IProps {
    premiumLevel: number;
    patrons: Array<PatreonItemViewModel>;
    settings: IMarqueeRequiredSettingsProps;
}

export const PatreonMarquee: React.FC<IProps> = (props: IProps) => {
    const {
        foregroundColour, backgroundColour,
        marqueSpeed = DesignPalette.marqueSpeedDefault,
        backgroundOpacity = DesignPalette.backgroundOpacityDefault,
        isProfilePicRounded, profilePicRoundedValue
    } = props.settings;

    let realValue = +marqueSpeed;
    const selectedValue = DesignPalette.marqueSpeedTicks.find(t => t.value === (+marqueSpeed));
    if (selectedValue != null && selectedValue.realValue != null) realValue = (+selectedValue.realValue);

    const styleObj = {
        backgroundColor: backgroundColour ?? undefined,
        opacity: backgroundOpacity / 100,
    };

    return (
        <div id="patreonMarquee">
            <div className="patreon-container-background" style={styleObj}></div>
            <Marquee gradient={false} className="patreon-container" speed={5 * realValue}>
                {
                    props?.patrons != null &&
                    props.patrons.map((item: PatreonItemViewModel) => (
                        <PatreonTile key={item.name} {...item} foregroundColour={foregroundColour}
                            isProfilePicRounded={isProfilePicRounded} profilePicRoundedValue={profilePicRoundedValue}
                            premiumLevel={props.premiumLevel}
                        />
                    ))
                }
            </Marquee>
        </div>
    );
}

