import React from 'react';

import { site } from '../../constants/site';
import { BasicLink } from '../core/link';
import packageJson from '../../../package.json';

interface IProps {

}

export const Footer: React.FC<IProps> = () => {
    return (
        <footer id="footer">
            <section>
                <h2>Patreon Banner</h2>
                <p>This site was built to be used by streamers to help easily display their Patreon Supporters without needing to go through the effort of crafting images and needing to keep them up to date as Patrons come and go.</p>
                {/* <ul className="actions">
                    <li><a href={routes.home} className="button">Go Home</a></li>
                </ul> */}
            </section>
            <section>
                <h2>AssistantApps</h2>
                <p style={{ marginBottom: '1em' }}>This site/app was designed by <BasicLink href={site.kurt.website}>Kurt Lourens</BasicLink> as part of the collection of tools under the name of <BasicLink href={site.assistantApps.website}>AssistantApps</BasicLink></p>
                <ul className="icons">
                    <li style={{ display: 'block' }}><BasicLink href={site.assistantApps.email} additionalClassNames="mt1">Send an Email</BasicLink></li>
                    <li style={{ display: 'block' }}><BasicLink href={site.assistantApps.discord} additionalClassNames="mt1">Join our Discord</BasicLink></li>
                    <li style={{ display: 'block' }}><BasicLink href={site.assistantApps.patreon} additionalClassNames="mt1">View our Patreon page</BasicLink></li>
                    <li style={{ display: 'block' }}><BasicLink href={site.assistantApps.github} additionalClassNames="mt1">View our Github Organisation</BasicLink></li>
                </ul>
            </section>
            <i>
                <BasicLink href={site.kurt.website}>&copy; {site.kurt.fullName}</BasicLink> - <BasicLink href={site.assistantApps.website}>AssistantApps</BasicLink> - {packageJson?.version ?? '1.0.0'}
            </i>
        </footer>
    );
}

export const EmptyFooter: React.FC<IProps> = () => {
    return (
        <footer id="footer">
            <section>
                <br />
                <br />
                <br />
            </section>
        </footer>
    );
}