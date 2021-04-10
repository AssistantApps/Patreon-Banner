import React, { useEffect } from 'react';

import { setBodyLoadingClass, setDocumentTitle } from '../helper/documentHelper';

import * as routes from '../constants/route';
import { AppImage } from '../constants/appImage';
import { Footer } from '../components/common/footer';
import { BasicImage } from '../components/core/image';

export const NotFoundPage: React.FC = () => {
    const effectTracker = '';
    useEffect(() => {
        setDocumentTitle('Error');
        setTimeout(() => {
            setBodyLoadingClass(false);
        }, 100);
    }, [effectTracker]);

    return (
        <div className="bg">
            <div className="wrapper pt5">
                <div id="main">
                    <section id="intro" className="main">
                        <div className="spotlight">
                            <BasicImage imageUrl={AppImage.notFoundImage} imageName="Not Found" classNames="lg-maxh-300 mr3 fl-left" />
                            <div className="content">
                                <header className="major">
                                    <h2>Not Found</h2>
                                </header>


                                <p>How did you get here? Whatever you were looking could not be found 🤷‍♂️</p>

                                <ul className="actions">
                                    <li style={{ paddingLeft: 0 }}><a href={routes.home} className="primary button">Go Home</a></li>
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
