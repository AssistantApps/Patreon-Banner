import React from 'react';

import { PatreonDisplaySwitcher } from '../../components/patreon/patreonDisplaySwitcher';

import { NetworkState } from '../../constants/enum/networkState';
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
            <PatreonDisplaySwitcher patronVm={patronVm} />
        </div>
    );
}

