import React, { useEffect } from 'react';

import { setBodyLoadingClass } from '../helper/documentHelper';

import { site } from '../constants/site';
import { DefaultTooltip } from '../components/common/tooltip/tooltip';
import { Header } from '../components/common/header';
import { Navbar } from '../components/common/navbar';
import { Footer } from '../components/common/footer';
import { BasicLink } from '../components/core/link';

export const HomePage: React.FC = () => {
	const effectTracker = '';
	useEffect(() => {
		setTimeout(() => {
			setBodyLoadingClass(false);
		}, 100);
	}, [effectTracker]);
	return (
		<div className="bg">
			<div className="wrapper">
				<Header />
				<Navbar />

				<div id="main">
					<section id="intro" className="main">
						<div className="spotlight">
							<div className="content">
								<header className="major">
									<h2>Patrons are awesome!</h2>
								</header>
								<p>They help you continue creating, so lets show them how much their support means! <span className="bold">Patreon Banner</span> aims to make it easy for you to display your Patrons without the need to verify and update your list.</p>
								<ul className="actions">
									<li><BasicLink href={site.assistantApps.patreon} additionalClassNames="noselect button">Learn More</BasicLink></li>
								</ul>
							</div>
							<span className="image">
								<img src="assets/img/patreonPadding.png" alt="Patreon Logo" />
							</span>
						</div>
					</section>

					<section id="getStarted" className="main">
						<div className="spotlight">
							<div className="content">
								<header className="major">
									<h2>The setup!</h2>
								</header>
								<p>The setup is designed to be super simple and easy to use. </p>
								<ul className="features special">
									<li>
										<span className="icon big icon-extension"></span>
										<h3>Install the Twitch Extension</h3>
										<p>The <BasicLink href={site.stream.twitchExtension}>Twitch extension</BasicLink> is currently the only way to use Patreon Banner. There are plans to make this available to everyone regardless of platform!</p>
									</li>
									<li>
										<span className="icon big icon-patreon"></span>
										<h3>Login with Patreon</h3>
										<p>This gives us access to read your Campaign's users, we do not collect your Patrons data and will never contact them.</p>
									</li>
									<li>
										<span className="icon big icon-browser"></span>
										<h3>Use the Banner</h3>
										<p>Use the provided url in your Streaming software as a <a href="https://blog.streamlabs.com/introducing-browser-source-interaction-for-streamlabs-obs-d8fc4dcbb1fb" target="_blank" rel="noopener noreferrer">browser source</a>. Customisation options are currently in development, expect them soon!</p>
									</li>
								</ul>
							</div>
						</div>
					</section>

					<section id="first" className="main special">
						<header className="major">
							<h2>Inside the machine</h2>
							<p>This is a brief overview of what goes on behind the scenes during the initial setup and when using this tool on your streams.</p>
						</header>
						<p className="content">
							Once you click the "Login with Patreon" button on the configure page of the&nbsp;
							<BasicLink href={site.stream.twitchExtension}>Twitch extension</BasicLink>,
							our web application opens a window that directs you to Patreon's Authorisation
							page. This page details the information that we would like access to. On clicking accept,
							Patreon sends a message to our servers, with credentials that only has access to what you have allowed.
							These credentials only last 30 days which our solution must periodically renew with Patreon&nbsp;<DefaultTooltip message="These credentials  are stored in our database."></DefaultTooltip>.
							We use these credentials to ask the Patreon API to give us a list of your Patrons&nbsp;<DefaultTooltip message="You Patrons list is stored in Redis for fast access.The data is temporarily stored and only lives in memory. If for example, the server turned off, the data is lost."></DefaultTooltip>.
							Your list of Patrons is cached on our servers to ensure high reliability and stability of our servers.
						</p>
						{/* // TODO Write blog post about this */}
						{/* <ul className="actions special">
							<li><a href="generic.html" className="button">Learn More</a></li>
						</ul> */}
					</section>

					{/* <section id="second" className="main special">
						<header className="major">
							<h2>Examples</h2>
						</header>
					</section> */}

					<section id="contact" className="main special">
						<header className="major">
							<h2>Contact Us</h2>
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
		</div>
	);
}
