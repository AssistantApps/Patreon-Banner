import classNames from 'classnames';
import React from 'react';

import { PatreonTile } from '../../components/patreon/patreonTile';
import { DesignPalette } from '../../constants/designPalette';
import { PatreonItemViewModel } from '../../contracts/generated/ViewModel/patreonItemViewModel';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

import './_patreonOneAtATime.scss';

interface IVerticalListRequiredSettingsProps {
    foregroundColour: string;
    backgroundColour: string;
    backgroundOpacity: number;
    oneAtATimeSpeed: number;
    isProfilePicRounded: boolean;
    profilePicRoundedValue: number;

}

interface IProps {
    premiumLevel: number;
    patrons: Array<PatreonItemViewModel>;
    settings: IVerticalListRequiredSettingsProps;
    isReversed?: boolean;
}

interface IState {
    intervalId: NodeJS.Timeout | any;
    currentItemIndex: number;
    timerInterval: number;
    timerIndex: number;
}

export class PatreonOneAtATime extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            intervalId: undefined,
            currentItemIndex: 0,
            timerInterval: 0,
            timerIndex: -1,
        };
    }

    componentDidMount() {
        this.setTimer();
    }

    shouldComponentUpdate(nextProps: IProps, nextState: IState) {
        if (this.props.isReversed !== nextProps.isReversed) return true;
        if (this.props.patrons !== nextProps.patrons) return true;
        if (this.props.settings !== nextProps.settings) return true;

        if (this.state.timerIndex !== nextState.timerIndex) return true;
        if (this.state.timerInterval !== nextState.timerInterval) return true;
        if (this.state.currentItemIndex !== nextState.currentItemIndex) return true;

        return false;
    }

    componentDidUpdate() {
        this.setTimer();
    }

    componentWillUnmount() {
        if (this.state.intervalId) clearInterval(this.state.intervalId);
    }

    setTimer = () => {
        if (this.state.intervalId) clearInterval(this.state.intervalId);

        let timerInterval = +(this.props.settings.oneAtATimeSpeed ?? DesignPalette.oneAtATimeSpeedDefault);
        const selectedValue = DesignPalette.oneAtATimeSpeedTicks.find(t => t.value === (+timerInterval));
        if (selectedValue != null && selectedValue.realValue != null) timerInterval = (+selectedValue.realValue);

        var intervalId = setInterval(this.timer, timerInterval);
        this.setState(() => ({ intervalId, timerInterval }));
    }

    getNextIndex = (arrLength: number, currentIndex: number) => this.getNewIndex(arrLength, currentIndex, 1);
    getPreviousIndex = (arrLength: number, currentIndex: number) => this.getNewIndex(arrLength, currentIndex, -1);

    getNewIndex = (arrLength: number, currentIndex: number, modifier: number) => {
        let newIndex = currentIndex + modifier;
        if (newIndex >= arrLength) newIndex = 0;
        return newIndex;
    }

    timer = () => {
        this.setState((prevState: IState) => {
            const { timerIndex } = prevState;
            const remainder = timerIndex % 2;
            const numPatrons = this.props.patrons.length;
            const maxTimerIndex = (numPatrons * 2);

            let newIndex = prevState.currentItemIndex;
            if (timerIndex > -1 && remainder !== 1) newIndex = this.getNextIndex(numPatrons + 1, prevState.currentItemIndex);

            let newTimerIndex = this.getNextIndex(maxTimerIndex, timerIndex);
            if (timerIndex === (maxTimerIndex - 1)) {
                newTimerIndex = 0;
                newIndex = this.getNextIndex(numPatrons + 1, prevState.currentItemIndex);
            }

            return {
                timerIndex: newTimerIndex,
                currentItemIndex: newIndex,
            }
        })
    }

    render() {
        const { premiumLevel, settings } = this.props;
        const { isProfilePicRounded, profilePicRoundedValue } = settings;
        const { currentItemIndex, timerInterval } = this.state;
        const isReversed = (this.props.isReversed ?? false);

        const pxOffest = isReversed
            ? ((this.props.patrons.length - currentItemIndex) * -50)
            : (currentItemIndex * -50);

        const patrons = this.props?.patrons ?? [];
        if (patrons.length < 1) return (<div id="patreonOneAtATime"></div>);
        if (isReversed) patrons.reverse();

        const transformValue = 'translateY(' + pxOffest + 'px)';

        const [firstPatron, ...unused] = patrons;
        const foregroundColour = settings.foregroundColour;

        const styleObj = {
            backgroundColor: settings.backgroundColour,
            opacity: settings.backgroundOpacity / 100,
        };

        let transProp: string | undefined;
        if (currentItemIndex !== 0) transProp = `all ${timerInterval / 3 * 4}ms`;

        return (
            <div id="patreonOneAtATime">
                <div className="patreon-container-background" style={styleObj}></div>
                <div className="patron-pos" style={{ transform: transformValue, transition: transProp }}>
                    {
                        patrons != null &&
                        patrons.map((item: PatreonItemViewModel) => (
                            <PatreonTile key={item.name} {...item} foregroundColour={foregroundColour} premiumLevel={premiumLevel}
                                isProfilePicRounded={isProfilePicRounded} profilePicRoundedValue={profilePicRoundedValue}
                            />
                        ))
                    }
                    <PatreonTile key={firstPatron.name + ' -first'} {...firstPatron} premiumLevel={premiumLevel}
                        isProfilePicRounded={isProfilePicRounded} profilePicRoundedValue={profilePicRoundedValue}
                    />
                </div>
                {/* Debugging
                <span style={{ position: 'absolute', top: 0, left: 0 }}>{timerIndex}</span> 
                */}
            </div>
        );
    }
}

