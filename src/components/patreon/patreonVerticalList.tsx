import React from 'react';

import { PatreonTile } from '../../components/patreon/patreonTile';
import { DesignPalette } from '../../constants/designPalette';
import { PatreonItemViewModel } from '../../contracts/generated/ViewModel/patreonItemViewModel';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

import './_patreonVerticalList.scss';

interface IProps {
    patronSettings: PatreonViewModel;
    isReversed?: boolean;
}

interface IState {
    isReversed: boolean;
}

export class PatreonVerticalList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const isReversed = (this.props.isReversed ?? false);

        this.state = {
            isReversed,
        };
    }

    render() {
        const patrons = this.props.patronSettings?.patrons ?? [];
        if (patrons.length < 1) return (<div id="patreonVerticalList"></div>);

        const {
            foregroundColour, backgroundColour, backgroundOpacity, verticalListSpeed
        } = this.props.patronSettings.settings;

        let realValue = +verticalListSpeed;
        const selectedValue = DesignPalette.verticalListSpeedTicks.find(t => t.value === (+verticalListSpeed));
        if (selectedValue != null && selectedValue.realValue != null) realValue = (+selectedValue.realValue);

        const styleObj = {
            backgroundColor: backgroundColour,
            opacity: backgroundOpacity / 100,
        };

        const animDuration = `${patrons.length * realValue}ms`;

        return (
            <div id="patreonVerticalList" className="no-scrollbar">
                <div className="patreon-container-background" style={styleObj}></div>
                <div className="list" style={{ animationDuration: animDuration }}>
                    {
                        patrons != null &&
                        patrons.map((item: PatreonItemViewModel) => (
                            <PatreonTile key={`list1-${item.name}`} {...item} foregroundColour={foregroundColour} />
                        ))
                    }
                </div>
                <div className="list" style={{ animationDuration: animDuration }}>
                    {
                        patrons != null &&
                        patrons.map((item: PatreonItemViewModel) => (
                            <PatreonTile key={`list2-${item.name}`} {...item} foregroundColour={foregroundColour} />
                        ))
                    }
                </div>
            </div>
        );
    }
}

