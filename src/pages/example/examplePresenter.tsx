import React from 'react';

import { AppImage } from '../../constants/appImage';
import { DisplayType } from '../../constants/enum/displayType';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

import { Footer } from '../../components/common/footer'
import { BrowserSourceSettings } from '../../components/settings/browserSourceSettings';

import { PatreonSettingsViewModel } from '../../contracts/generated/ViewModel/patreonSettingsViewModel';

interface IContainerProps {
    testData: PatreonViewModel;
    settings: PatreonSettingsViewModel;
    setDisplayType: (displayType: DisplayType) => void;
    editSettings: (name: string) => (value: string) => void;
}

interface IProps extends IContainerProps {
    displayType: DisplayType;
}

export const ExamplePagePresenter: React.FC<IProps> = (props: IProps) => {

    const patronVm = {
        ...props.testData,
        settings: { ...props.settings }
    }

    return (
        <div className="wrapper pt5">
            <div id="main">
                <BrowserSourceSettings
                    patreonData={patronVm}
                    onSave={(_) => { }}
                />
            </div>

            <Footer />
        </div>
    );
}
