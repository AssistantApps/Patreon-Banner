import React from 'react';

import { PatreonBannerDisplayType } from '../../contracts/generated/Enum/patreonBannerDisplayType';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

import { Footer } from '../../components/common/footer'
import { BrowserSourceSettings } from '../../components/settings/browserSourceSettings';

import { PatreonSettingsViewModel } from '../../contracts/generated/ViewModel/patreonSettingsViewModel';

interface IContainerProps {
    testData: PatreonViewModel;
    settings: PatreonSettingsViewModel;
    setDisplayType: (displayType: PatreonBannerDisplayType) => void;
    editSettings: (name: string) => (value: string) => void;
}

interface IProps extends IContainerProps {
    displayType: PatreonBannerDisplayType;
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
