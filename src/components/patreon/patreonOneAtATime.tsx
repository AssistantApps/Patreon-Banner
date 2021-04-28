import classNames from 'classnames';
import React from 'react';

import { PatreonTile } from '../../components/patreon/patreonTile';
import { PatreonItemViewModel } from '../../contracts/generated/ViewModel/patreonItemViewModel';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

import './_patreonOneAtATime.scss';

interface IProps {
    patronSettings: PatreonViewModel;
    isReversed?: boolean;
}

interface IState {
    intervalId: NodeJS.Timeout | any;
    currentItemIndex: number;
    timerIndex: number;
    isReversed: boolean;
}

export class PatreonOneAtATime extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const isReversed = (this.props.isReversed ?? false);

        this.state = {
            intervalId: undefined,
            currentItemIndex: 0,
            timerIndex: -1,
            isReversed,
        };
    }

    componentDidMount() {
        var intervalId = setInterval(this.timer, 1500);
        this.setState(() => ({ intervalId }));
    }

    componentWillUnmount() {
        if (this.state.intervalId) clearInterval(this.state.intervalId);
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
            const numPatrons = this.props.patronSettings.patrons.length;
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
        const { currentItemIndex, isReversed } = this.state;
        const pxOffest = isReversed
            ? ((this.props.patronSettings.patrons.length - currentItemIndex) * -50)
            : (currentItemIndex * -50);

        const patrons = this.props.patronSettings?.patrons ?? [];
        if (patrons.length < 1) return (<div id="patreonOneAtATime"></div>);
        if (isReversed) patrons.reverse();

        const transformValue = 'translateY(' + pxOffest + 'px)';

        const [firstPatron, ...unused] = patrons;

        return (
            <div id="patreonOneAtATime">
                <div className={classNames('patron-pos', { 'transition': currentItemIndex !== 0 })} style={{ transform: transformValue }}>
                    {
                        patrons != null &&
                        patrons.map((item: PatreonItemViewModel) => (
                            <PatreonTile key={item.name} {...item} />
                        ))
                    }
                    <PatreonTile key={firstPatron.name + ' -first'} {...firstPatron} />
                </div>
                {/* Debugging
                <span style={{ position: 'absolute', top: 0, left: 0 }}>{timerIndex}</span> 
                */}
            </div>
        );
    }
}

