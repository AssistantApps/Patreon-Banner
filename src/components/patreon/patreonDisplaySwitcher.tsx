import React from 'react';

import { PatreonMarquee } from '../../components/patreon/patreonMarquee';
import { PatreonVerticalList } from '../../components/patreon/patreonVerticalList';
import { PatreonOneAtATime } from '../../components/patreon/patreonOneAtATime';

import { PatreonBannerDisplayType } from '../../contracts/generated/Enum/patreonBannerDisplayType';
import { PatreonViewModel } from '../../contracts/generated/ViewModel/patreonViewModel';

interface IProps {
    patronVm: PatreonViewModel;
}

export const PatreonDisplaySwitcher: React.FC<IProps> = (props: IProps) => {
    const { settings } = props.patronVm;

    if (settings.displayType === PatreonBannerDisplayType.marque) return (<PatreonMarquee {...props.patronVm} />);
    if (settings.displayType === PatreonBannerDisplayType.verticalList) return (<PatreonVerticalList {...props.patronVm} isBrowserSource={true} />);
    if (settings.displayType === PatreonBannerDisplayType.oneAtATime) return (<PatreonOneAtATime {...props.patronVm} />);

    return (<div className="PatreonDisplaySwitcher - NoMatch"></div>);
}

