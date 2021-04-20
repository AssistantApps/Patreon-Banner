import React from 'react';

import { site } from '../../constants/site';
import * as route from '../../constants/route';
import { SegmentedControl } from '../../components/common/segmentedControl/segmentedControl';
import { BasicLink } from '../../components/core/link';

import './_homePageSetupComponent.scss';

interface IProps { }
interface IState {
	setupSectionIndex: number;
}

export class HomePageSetupComponent extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			setupSectionIndex: 0
		};
	}

	onChangeMode = (newValue: number) => {
		this.setState({ setupSectionIndex: newValue });
	}

	render() {
		return (
			<section id="get-started" className="main">
				<div className="spotlight">
					<div className="content pos-rel">
						<header className="major">
							<h2>The setup!</h2>
						</header>
						<div className="set-choice-container">
							{/* <SegmentedControl
								segmentedControlName="setup-detail-selection"
								onChange={this.onChangeMode}
								options={[
									{
										label: 'Default',
										value: 0,
									},
									{
										label: 'Twitch',
										value: 1,
									},
								]}
							/> */}
							{
								(this.state.setupSectionIndex == 0)
									? <BasicLink href="#" onClick={() => this.onChangeMode(1)}>Switch to Twitch setup</BasicLink>
									: <BasicLink href="#" onClick={() => this.onChangeMode(0)}>Back to Default setup</BasicLink>
							}
						</div>
						<p>The setup is designed to be super simple and easy to use. You can either use this website or the <BasicLink href={site.stream.twitchExtension}>Twitch extension</BasicLink>. There is no advantage to using one or the other, the options are simply available depending on your preference</p>
						<ul className="features special">
							{
								(this.state.setupSectionIndex == 0)
									? <>
										<li>
											<span className="icon big icon-extension"></span>
											<h3>Head over to Config page</h3>
											<p>Head over to the Config page <BasicLink href={route.config}>here</BasicLink> to login. From there (once logged in) you can configure your <span className="bold">Patreon Banner</span>.</p>
										</li>
									</>
									: <>
										<li>
											<span className="icon big icon-extension"></span>
											<h3>Install the Twitch Extension</h3>
											<p>The <BasicLink href={site.stream.twitchExtension}>Twitch extension</BasicLink> is currently the only way to use <span className="bold">Patreon Banner</span>. There are plans to make this available to everyone regardless of platform!</p>
										</li>
									</>
							}
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
		);
	}
}
