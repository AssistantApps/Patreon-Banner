import React from 'react';

import { BasicImage } from '../../core/image';
import { BasicLink } from '../../core/link';
import { AppImage } from '../../../constants/appImage';
import { PatreonViewModel } from '../../../contracts/generated/ViewModel/patreonViewModel';
import { getApp } from '../../../helper/configHelper';

import { PatreonVerticalList } from '../patreonVerticalList';


interface IProps {
    isTestData: boolean;
    patronVm: PatreonViewModel;
    // channelId: string;
}

export const PatreonPanelPresenter: React.FC<IProps> = (props: IProps) => {
    const { patronVm, isTestData } = props;

    return (
        <div id="panel" className="bg" draggable={false}>
            <PatreonVerticalList patronVm={patronVm} />
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
