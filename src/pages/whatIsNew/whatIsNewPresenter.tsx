import React, { ReactNode } from 'react';
import Markdown from 'markdown-to-jsx';

import { NetworkState } from '../../constants/enum/networkState';
import { VersionViewModel } from '../../contracts/generated/AssistantApps/Version/versionViewModel';
import { SmallLoading } from '../../components/loading';
import { Accordian } from '../../components/common/accordian/accordian';
import { toLongDate } from '../../helper/datehelper';

interface IProps {
    whatIsNewItems: Array<VersionViewModel>;
    whatIsNewStatus: NetworkState;
}

export const WhatIsNewPresenter: React.FC<IProps> = (props: IProps) => {

    const handleLoadingOrError = (displayFunc: (props: IProps) => ReactNode): ReactNode => {
        if (props.whatIsNewStatus === NetworkState.Loading) return <SmallLoading />;
        if (props.whatIsNewStatus === NetworkState.Error) {
            return (<h3>Something went wrong</h3>);
        }
        if (props.whatIsNewItems == null ||
            props.whatIsNewItems.length < 1) {
            return (<h3>No Items</h3>);
        }
        return displayFunc(props);
    }

    const displayWhatIsNewData = (whatIsNewItems: Array<VersionViewModel>): ReactNode => {
        const winItems = (whatIsNewItems ?? []);
        return (
            <Accordian
                list={winItems.map((win: VersionViewModel, index: number) => {
                    return {
                        id: win.guid,
                        defaultChecked: index === 0,
                        title: toLongDate(win.activeDate),
                        content: <Markdown>{win.markdown}</Markdown>,
                    };
                })}
            />
        );
    }

    return (
        <div className="wrapper pt5 pb5">
            <div id="main">
                <section id="intro" className="main">
                    <div className="spotlight">
                        <div className="content">
                            <header className="major">
                                <h2>Updates</h2>
                            </header>
                            <div className="container full pt1">
                                {handleLoadingOrError((localProps: IProps) => displayWhatIsNewData(localProps.whatIsNewItems))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
