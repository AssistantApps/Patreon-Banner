import React from 'react';

import { DisplayType } from '../../constants/enum/displayType';
import { ExamplePagePresenter } from './examplePresenter';

interface IProps { }

interface IState {
    displayType: DisplayType;
}

export class ExamplePageContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            displayType: DisplayType.Marquee,
        };
    }

    setDisplayType = (displayType: DisplayType) => {
        this.setState(() => {
            return {
                displayType
            }
        })
    }

    render() {
        return (
            <ExamplePagePresenter
                {...this.state}
                {...this.props}
                setDisplayType={this.setDisplayType}
            />
        )
    }
}

