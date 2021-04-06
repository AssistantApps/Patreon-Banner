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
                <h2>Aliquam sed mauris</h2>
                <p>Sed lorem ipsum dolor sit amet et nullam consequat feugiat consequat magna adipiscing tempus etiam dolore veroeros. eget dapibus mauris. Cras aliquet, nisl ut viverra sollicitudin, ligula erat egestas velit, vitae tincidunt odio.</p>
                <ul className="actions">
                    <li><a href="generic.html" className="button">Learn More</a></li>
                </ul>
            </section>
            <section>
                <h2>Etiam feugiat</h2>
                <dl className="alt">
                    <dt>Address</dt>
                    <dd>1234 Somewhere Road &bull; Nashville, TN 00000 &bull; USA</dd>
                    <dt>Phone</dt>
                    <dd>(000) 000-0000 x 0000</dd>
                    <dt>Email</dt>
                    <dd><BasicLink href="#">information@untitled.tld</BasicLink></dd>
                </dl>
                <ul className="icons">
                    <li><BasicLink href="#" additionalClassNames="icon brands fa-twitter alt"><span className="label">Twitter</span></BasicLink></li>
                    <li><BasicLink href="#" additionalClassNames="icon brands fa-facebook-f alt"><span className="label">Facebook</span></BasicLink></li>
                    <li><BasicLink href="#" additionalClassNames="icon brands fa-instagram alt"><span className="label">Instagram</span></BasicLink></li>
                    <li><BasicLink href="#" additionalClassNames="icon brands fa-github alt"><span className="label">GitHub</span></BasicLink></li>
                    <li><BasicLink href="#" additionalClassNames="icon brands fa-dribbble alt"><span className="label">Dribbble</span></BasicLink></li>
                </ul>
            </section>
            <i>
                <BasicLink href={site.kurt.website}>&copy; {site.kurt.fullName}</BasicLink> - <BasicLink href={site.assistantApps.website}>AssistantApps</BasicLink> - {packageJson?.version ?? '1.0.0'}
            </i>
        </footer>
    );
}