import React, { useEffect } from 'react';

import { setBodyLoadingClass, setDocumentTitle } from '../helper/documentHelper';

import * as routes from '../constants/route';
import { AppImage } from '../constants/appImage';
import { ErrorMessages } from '../constants/errorMessages';
import { Footer } from '../components/common/footer';
import { BasicImage } from '../components/core/image';
import { BasicLink } from '../components/core/link';
import { site } from '../constants/site';

interface IProps {
    match?: any
}

export const ErrorPage: React.FC<IProps> = (props: IProps) => {
    const effectTracker = '';
    useEffect(() => {
        setDocumentTitle('Error');
        setTimeout(() => {
            setBodyLoadingClass(false);
        }, 100);
    }, [effectTracker]);

    const { match: { params } } = props;
    let messageToDisplay: string | null = null;

    if (params.code != null) {
        const errorMessage = ErrorMessages[params.code];
        if (errorMessage != null) {
            messageToDisplay = errorMessage;
        }
    }

    return (
        <div className="bg">
            <div className="wrapper pt5">
                <div id="main">
                    <section id="intro" className="main">
                        <div className="spotlight">
                            <div className="content">
                                <header className="major">
                                    <h2>Error</h2>
                                </header>

                                <BasicImage imageUrl={AppImage.errorImage} imageName="Error" classNames="lg-max-33 fl-left" />

                                {
                                    messageToDisplay
                                        ? <p>{messageToDisplay}</p>
                                        : <p>{ErrorMessages[100]}</p>
                                }
                                <ul className="actions">
                                    <li style={{ paddingLeft: 0 }}><a href={routes.home} className="primary noselect button">Go Home</a></li>
                                    <li><BasicLink href={site.assistantApps.email} additionalClassNames="noselect button">Email Support</BasicLink></li>
                                </ul>

                            </div>
                        </div>
                    </section>
                </div>

                <Footer />
            </div>
        </div>
    );
}
