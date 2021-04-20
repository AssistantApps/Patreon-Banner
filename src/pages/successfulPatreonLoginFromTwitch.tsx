import React, { useEffect } from 'react';

import { setBodyLoadingClass, setDocumentTitle } from '../helper/documentHelper';

import * as routes from '../constants/route';
import { EmptyFooter } from '../components/common/footer';
import { BasicLink } from '../components/core/link';
import { site } from '../constants/site';
import { SuccessAnimated } from '../components/common/animated/success';

interface IProps {
}

export const SuccessfulPatreonLoginFromTwitchPage: React.FC<IProps> = (props: IProps) => {
    const effectTracker = '';
    useEffect(() => {
        setDocumentTitle('Success!');
        setTimeout(() => {
            setBodyLoadingClass(false);
        }, 100);
    }, [effectTracker]);

    return (
        <div className="wrapper pt5">
            <div id="main">
                <section id="intro" className="main">
                    <div className="spotlight">
                        <div className="content">
                            <header className="major">
                                <h2>Success!</h2>
                            </header>

                            <SuccessAnimated classNames="lg-maxh-300 m-h-auto fl-left-gt-sm" />

                            <p>Your Patreon login was successful! You can now close this window.</p>
                            <ul className="actions">
                                <li style={{ paddingLeft: 0 }}><a href={routes.home} className="primary noselect button">Go Home</a></li>
                                <li><BasicLink href={site.assistantApps.email} additionalClassNames="noselect button">Email Support</BasicLink></li>
                            </ul>

                        </div>
                    </div>
                </section>
            </div>

            <EmptyFooter />
        </div>
    );
}
