import React from 'react';

import { DefaultPatreonSettings } from '../../constants/designPalette';
import { PatreonBannerDisplayType } from '../../contracts/generated/Enum/patreonBannerDisplayType';
import { patreonTestData } from '../../constants/testData/patreonTestData';
import { PatreonSettingsViewModel } from '../../contracts/generated/ViewModel/patreonSettingsViewModel';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';
import { ExamplePagePresenter } from './examplePresenter';

interface IProps { }

interface IState {
    displayType: PatreonBannerDisplayType;
    testData: PatreonViewModel;
    settings: PatreonSettingsViewModel;
}

export class ExamplePageContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            displayType: PatreonBannerDisplayType.marque,
            testData: patreonTestData().value,
            settings: DefaultPatreonSettings
        };
    }

    setDisplayType = (displayType: PatreonBannerDisplayType) => {
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

