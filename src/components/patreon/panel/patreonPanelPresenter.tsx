import React from 'react';
import classNames from 'classnames';

import { BasicImage } from '../../core/image';
import { BasicLink } from '../../core/link';
import { AppImage } from '../../../constants/appImage';
import { NetworkState } from '../../../constants/enum/networkState';
import { PatreonViewModel } from '../../../contracts/generated/ViewModel/patreonViewModel';
import { getApp } from '../../../helper/configHelper';
import { getPanelSettings } from '../../../helper/panelSettingsHelper';

import { PatreonVerticalList } from '../patreonVerticalList';
import { anyObject } from '../../../helper/typescriptHacks';
import { SmallLoading } from '../../loading';

export interface IProps {
    patreonNetworkState: NetworkState;
    patronVm: PatreonViewModel;
}

export const PatreonPanelPresenter: React.FC<IProps> = (props: IProps) => {
    const { patronVm, patreonNetworkState } = props;
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
            {
                (patreonNetworkState == NetworkState.Pending || patreonNetworkState == NetworkState.Loading)
                    ? <SmallLoading additionalClasses="mt5" />
                    : <PatreonVerticalList
                        patrons={patronVm.patrons}
                        campaignUrl={patronVm.campaignUrl}
                        premiumLevel={patronVm.premiumLevel}
                        settings={getPanelSettings(patronVm.settings)}
                    />
            }
            <BasicLink id="ad" href={getApp()}>
                <BasicImage imageUrl={AppImage.logo100} />
            </BasicLink>
        </div>
    );
}
