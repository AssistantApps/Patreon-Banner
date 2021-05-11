import React from 'react';
import Marquee from "react-fast-marquee";

import { PatreonTile } from '../../components/patreon/patreonTile';
import { PatreonItemViewModel } from '../../contracts/generated/ViewModel/patreonItemViewModel';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

interface IProps {
    patronSettings: PatreonViewModel;
}

export const PatreonMarquee: React.FC<IProps> = (props: IProps) => {

    return (
        <div id="patreonMarquee">
            <div className="patreon-container-background" style={{ backgroundColor: props.patronSettings.settings.backgroundColour }}></div>
            <Marquee gradient={false} className="patreon-container">
                {
                    props?.patronSettings?.patrons != null &&
                    props.patronSettings?.patrons.map((item: PatreonItemViewModel) => (
                        <PatreonTile
                            key={item.name}
                            {...item}
                            foregroundColour={props.patronSettings.settings.foregroundColour}
                        />
                    ))
                }
            </Marquee>
        </div>
    );
}

