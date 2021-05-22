import React from 'react';
import classNames from 'classnames';

import { BasicImage } from '../../core/image';
import { BasicLink } from '../../core/link';
import { AppImage } from '../../../constants/appImage';
import { PatreonViewModel } from '../../../contracts/generated/ViewModel/patreonViewModel';
import { getApp } from '../../../helper/configHelper';
import { getPanelSettings } from '../../../helper/panelSettingsHelper';

import { PatreonVerticalList } from '../patreonVerticalList';
import { anyObject } from '../../../helper/typescriptHacks';


interface IProps {
    isTestData: boolean;
    patronVm: PatreonViewModel;
    // channelId: string;
}

export const PatreonPanelPresenter: React.FC<IProps> = (props: IProps) => {
    const { patronVm, isTestData } = props;
    const { panelUseDefaultBackground, panelCustomBackgroundImageUrl } = patronVm.settings;

    let styleObj: any = anyObject;
    const useBackgroundImage = (panelUseDefaultBackground == false && panelCustomBackgroundImageUrl && panelCustomBackgroundImageUrl.length > 10);
    if (useBackgroundImage) {
        styleObj = {
            backgroundImage: `url(${panelCustomBackgroundImageUrl})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        };
    }

    return (
        <div id="panel" className={classNames({ 'bg': panelUseDefaultBackground })} style={styleObj} draggable={false}>
            <PatreonVerticalList
                patrons={patronVm.patrons}
                campaignUrl={patronVm.campaignUrl}
                premiumLevel={patronVm.premiumLevel}
                settings={getPanelSettings(patronVm.settings)}
            />
            <BasicLink id="ad" href={getApp()}>
                <BasicImage imageUrl={AppImage.logo100} />
            </BasicLink>
            {
                isTestData &&
                <div id="testData">
                    <span>Sample data</span>
                </div>
            }
        </div>
    );
}
