import React from 'react';
import classNames from 'classnames';

import { site } from '../../constants/site';
import { BasicLink } from '../core/link';

interface IProps {
}

export const Navbar: React.FC<IProps> = (props: IProps) => {
    return (
        <nav id="nav">
            <ul>
                <li><BasicLink href="#intro" additionalClassNames="active">Introduction</BasicLink></li>
                <li><BasicLink href="#first">First Section</BasicLink></li>
                <li><BasicLink href="#second">Second Section</BasicLink></li>
                <li><BasicLink href="#cta">Get Started</BasicLink></li>
            </ul>
        </nav>
    );
}