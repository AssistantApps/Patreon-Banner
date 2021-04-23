import classNames from 'classnames';
import React from 'react';

import { PatreonTile } from '../../components/patreon/patreonTile';
import { PatreonItemViewModel } from '../../contracts/generated/ViewModel/patreonItemViewModel';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

import './_patreonOneAtATime.scss';

enum OneAtATimePosition {
    top = 0,
    visible = 1,
    bottom = 2,
}
const numOneAtATimePositions = 3;

interface IProps {
    patronSettings: PatreonViewModel;
    isReversed?: boolean;
}

interface IState {
    intervalId: NodeJS.Timeout | any;
    currentItemIndex: number;
    currentItemPosition: OneAtATimePosition;
    endingItemPosition: OneAtATimePosition;
    isReversed: boolean;
}

export class PatreonOneAtATime extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const isReversed = (this.props.isReversed ?? false);
        const startingItemPosition = isReversed ? OneAtATimePosition.top : OneAtATimePosition.bottom;
        const endingItemPosition = isReversed ? OneAtATimePosition.bottom : OneAtATimePosition.top;

        this.state = {
            intervalId: undefined,
            currentItemIndex: 0,
            currentItemPosition: startingItemPosition,
            endingItemPosition,
            isReversed,
        };
    }

    componentDidMount() {
        var intervalId = setInterval(this.timer, 2500);
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

    getPreviousOneAtATimePosition = (current: OneAtATimePosition): OneAtATimePosition => {
        if (current === OneAtATimePosition.visible) {
            return OneAtATimePosition.top;
        }
        if (current === OneAtATimePosition.bottom) {
            return OneAtATimePosition.visible;
        }

        return OneAtATimePosition.top;
    }

    timer = () => {
        const { currentItemPosition } = this.state;

        let currentItemPositionNum = currentItemPosition as number;
        currentItemPositionNum += (this.state.isReversed ? -1 : 1)

        let getNextItem = false;
        let newCurrentItemPosition = 0;
        if (currentItemPositionNum < (OneAtATimePosition.top as number)) {
            newCurrentItemPosition = this.getPreviousIndex(numOneAtATimePositions, currentItemPositionNum);
            getNextItem = true;
        } else if (currentItemPositionNum > (OneAtATimePosition.bottom as number)) {
            newCurrentItemPosition = this.getNextIndex(numOneAtATimePositions, currentItemPositionNum);
            getNextItem = true;
        } else {
            newCurrentItemPosition = currentItemPositionNum as number
        }

        this.setState((prevState: IState) => {
            let newIndex = prevState.currentItemIndex;
            if (getNextItem) newIndex = this.getNextIndex(this.props.patronSettings.patrons.length, prevState.currentItemIndex);

            return {
                currentItemIndex: newIndex,
                currentItemPosition: newCurrentItemPosition,
            }
        })
    }

    render() {
        let nextPatronIndex = this.getNextIndex(this.props.patronSettings.patrons.length, this.state.currentItemIndex);
        let doubleNextPatronIndex = this.getNextIndex(this.props.patronSettings.patrons.length, nextPatronIndex);

        const currentPatron: PatreonItemViewModel = this.props.patronSettings.patrons[this.state.currentItemIndex];
        const nextPatron: PatreonItemViewModel = this.props.patronSettings.patrons[nextPatronIndex];
        const doubleNextPatron: PatreonItemViewModel = this.props.patronSettings.patrons[doubleNextPatronIndex];

        const currentPatronPosition: OneAtATimePosition = this.state.currentItemPosition;
        const nextPatronPosition: OneAtATimePosition = this.getPreviousOneAtATimePosition(currentPatronPosition);
        const doubleNextPatronPosition: OneAtATimePosition = this.getPreviousOneAtATimePosition(nextPatronPosition);

        const shouldTransition = this.state.currentItemPosition != this.state.endingItemPosition;

        return (
            <div id="patreonOneAtATime">
                <div className={classNames('patron-pos', OneAtATimePosition[doubleNextPatronPosition], { 'transition': shouldTransition })}>
                    <PatreonTile key={doubleNextPatron.name} {...doubleNextPatron} />
                </div>
                <div className={classNames('patron-pos', OneAtATimePosition[nextPatronPosition], { 'transition': shouldTransition })}>
                    <PatreonTile key={nextPatron.name} {...nextPatron} />
                </div>
                <div className={classNames('patron-pos', OneAtATimePosition[currentPatronPosition], { 'transition': shouldTransition })}>
                    <PatreonTile key={currentPatron.name} {...currentPatron} />
                </div>
            </div>
        );
    }
}

