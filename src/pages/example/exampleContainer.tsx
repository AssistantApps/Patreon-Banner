import React from 'react';
import { ColourPalette } from '../../constants/colourPalette';

import { DisplayType } from '../../constants/enum/displayType';
import { patreonTestData } from '../../constants/testData/patreonTestData';
import { PatreonSettingsViewModel } from '../../contracts/generated/ViewModel/patreonSettingsViewModel';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';
import { ExamplePagePresenter } from './examplePresenter';

interface IProps { }

interface IState {
    displayType: DisplayType;
    testData: PatreonViewModel;
    settings: PatreonSettingsViewModel;
}

export class ExamplePageContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            displayType: DisplayType.Marquee,
            testData: patreonTestData().value,
            settings: {
                foregroundColour: ColourPalette.foregroundDefault,
                backgroundColour: ColourPalette.backgroundDefault,
            }
        };
    }

    setDisplayType = (displayType: DisplayType) => {
        this.setState(() => {
            return {
                displayType
            }
        })
    }

    editSettings = (name: string) => (value: string) => {
        this.setState((prevState: IState) => {
            return {
                settings: {
                    ...prevState.settings,
                    [name]: value
                }
            } as any
        });
    }

    render() {
        return (
            <ExamplePagePresenter
                {...this.state}
                {...this.props}
                setDisplayType={this.setDisplayType}
                editSettings={this.editSettings}
            />
        )
    }
}

