import React, { useEffect } from 'react';
import ScrollUp from 'react-scrollup-lite';

import { setBodyLoadingClass } from '../../helper/documentHelper';

import { site } from '../../constants/site';
import * as route from '../../constants/route';
import { DefaultTooltip } from '../../components/common/tooltip/tooltip';
import { Header } from '../../components/common/header';
import { Navbar } from '../../components/common/navbar';
import { Footer } from '../../components/common/footer';
import { BasicInternalLink, BasicLink } from '../../components/core/link';

import { HomePageSetupComponent } from './homePageSetupComponent';

export const HomePresenter: React.FC = () => {
    const effectTracker = '';
    useEffect(() => {
        setTimeout(() => {
            setBodyLoadingClass(false);
        }, 100);
    }, [effectTracker]);

    const navBarLinks = [
        {
            link: '#intro',
            name: 'Get started'
        },
        {
            link: '#get-started',
            name: 'The setup'
        },
        {
            link: '#how-it-works',
            name: 'How it works'
        },
        // {
        //     link: '#examples',
        //     name: 'Examples'
        // },
        {
            link: '#contact',
            name: 'Contact us'
        }
    ];

    return (
        <>
            <ScrollUp
                startPosition={0}
                showAtPosition={400}
                position='right'
                className='scroll-up'
            >
                <i className="icon-chevron-up x2 pointer"></i>
            </ScrollUp>
            <div className="wrapper">
                <Header />
                <Navbar
                    links={navBarLinks}
                    initialActiveLink="#intro"
                />

                <div id="main">
                    <section id="intro" className="main">
                        <div className="spotlight">
                            <div className="content">
                                <header className="major">
                                    <h2>Patrons are awesome!</h2>
                                </header>
                                <p>They help you continue creating, so lets show them how much their support means! <span className="bold">Patreon Banner</span> aims to make it easy for you to display your Patrons without the need to verify and update your list.</p>
                                <ul className="actions">
                                    <li><BasicInternalLink href={route.config} additionalClassNames="noselect button">Get Started</BasicInternalLink></li>
                                </ul>
                            </div>
                            <span className="image">
                                <img src="assets/img/patreonPadding.png" alt="Patreon Logo" />
                            </span>
                        </div>
                    </section>

                    <HomePageSetupComponent />

                    <section id="how-it-works" className="main special">
                        <header className="major">
                            <h2>Inside the machine</h2>
                            <p>This is a brief overview of what goes on behind the scenes during the initial setup and when using this tool on your streams.</p>
                        </header>
                        <p className="content">
                            Once you click the "Login with Patreon" button on the configure page on either&nbsp;
                            this website or on the <BasicLink href={site.stream.twitchExtension}>Twitch extension</BasicLink>,&nbsp;
							our web application opens a window that directs you to Patreon's Authorisation&nbsp;
							page. This page details the information that we would like access to. On clicking accept,&nbsp;
							Patreon sends a message to our servers, with credentials that only has access to what you have allowed.&nbsp;
							These credentials only last 30 days which our solution must periodically renew with Patreon&nbsp;<DefaultTooltip message="These temporary credentials are stored in our database."></DefaultTooltip>.
							We use these credentials to ask the Patreon API to give us a list of your Patrons&nbsp;<DefaultTooltip message="You Patrons list is stored in Redis for fast access.The data is temporarily stored and only lives in memory. If for example, the server turned off, the data is lost."></DefaultTooltip>.
							Your list of Patrons is cached on our servers to ensure high reliability and stability of our servers.
						</p>
                        {/* // TODO Write blog post about this */}
                        {/* <ul className="actions special">
							<li><a href="generic.html" className="button">Learn More</a></li>
						</ul> */}
                    </section>

                    {/* // TODO Pictures of  */}
                    {/* <section id="second" className="main special">
						<header className="major">
							<h2>Examples</h2>
						</header>
					</section> */}

                    <section id="contact" className="main special">
                        <header className="major">
                            <h2>Contact us</h2>
                            <p>Feel free to send an email, or join our Discord server to give us some feedback and suggestions!. Also checkout our home page for the other apps and tools that we provide!</p>
                        </header>
                        <footer className="major">
                            <ul className="actions special">
                                <li><BasicLink href={site.assistantApps.discord} additionalClassNames="button">Discord</BasicLink></li>
                                <li><BasicLink href={site.assistantApps.website} additionalClassNames="button primary">AssistantApps</BasicLink></li>
                                <li><BasicLink href={site.assistantApps.email} additionalClassNames="button">Email</BasicLink></li>
                            </ul>
                        </footer>
                    </section>

                </div>

                <Footer />
            </div>
        </>
    );
}
