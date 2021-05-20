import React from 'react';

import { PatreonMarquee } from '../../components/patreon/patreonMarquee';
import { PatreonVerticalList } from '../../components/patreon/patreonVerticalList';
import { PatreonOneAtATime } from '../../components/patreon/patreonOneAtATime';

import { NetworkState } from '../../constants/enum/networkState';
import { PatreonBannerDisplayType } from '../../contracts/generated/Enum/patreonBannerDisplayType';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

interface IProps {
    patreonNetworkState: NetworkState;
    patronVm: PatreonViewModel;
}

export const DisplayPagePresenter: React.FC<IProps> = (props: IProps) => {
    const { patronVm, patreonNetworkState } = props;
    if (patreonNetworkState !== NetworkState.Success) return <span></span>

    return (
        <div id="display" className="height-100vh" draggable={false}>
            {
                patronVm.settings.displayType === PatreonBannerDisplayType.marque &&
                <PatreonMarquee
                    patrons={patronVm.patrons}
                    settings={patronVm.settings}
                    premiumLevel={patronVm.premiumLevel}
                />
            }
            {
                patronVm.settings.displayType === PatreonBannerDisplayType.verticalList &&
                <PatreonVerticalList
                    patrons={patronVm.patrons}
                    settings={patronVm.settings}
                    premiumLevel={patronVm.premiumLevel}
                />
            }
            {
                patronVm.settings.displayType === PatreonBannerDisplayType.oneAtATime &&
                <PatreonOneAtATime
                    patrons={patronVm.patrons}
                    settings={patronVm.settings}
                    premiumLevel={patronVm.premiumLevel}
                />
            }
        </div>
    );
}

