import React from 'react';

import { site } from '../../constants/site';
import { paymentOptions, PaymentBadge } from '../../components/common/premium/paymentMethod';
import { Premium } from '../../components/common/svg/premium';
import { Footer } from '../../components/common/footer';
import { PatreonButton } from '../../components/patreon/patreonButton';
import { AppImage } from '../../constants/appImage';

export const PremiumPresenter: React.FC = () => {
    return (
        <div className="wrapper pt5">
            <div id="main">
                <section id="premium" className="main">
                    <div className="spotlight">
                        <div className="content">
                            <header className="major">
                                <h1 className="ta-center">
                                    <Premium classNames="inline-h2 flip-h" />&nbsp;Premium&nbsp;<Premium classNames="inline-h2" />
                                </h1>
                            </header>
                            <div className="container full ta-center pt1">
                                <p>Do you want access to all the features that <strong style={{ fontWeight: 'bolder' }}>PatreonBanner</strong> provides? For a small price you can get the latest premium features unlocked.</p>
                                <p className="mb0">Multiple payment options available:</p>
                                <div className="row justify">
                                    <div className="col-4">
                                        <PaymentBadge
                                            key="patreon"
                                            name="Join our Patreon"
                                            src={AppImage.donation.patreon}
                                            external={site.assistantApps.patreon}
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div className="row justify mt2">
                                    {
                                        paymentOptions.map((pOpt) => {
                                            return (
                                                <div className="col-3">
                                                    <PaymentBadge {...pOpt} />
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}
