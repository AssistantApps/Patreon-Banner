import React from 'react';
import { AppImage } from '../../constants/appImage';
import { BasicImage } from '../core/image';

interface IProps {
}

export const Header: React.FC<IProps> = (props: IProps) => {
    return (
        <header id="header" className="alt">
            <span className="logo"><BasicImage imageUrl={AppImage.logo100} alt="" /></span>
            <h1>Patreon Banner</h1>
            <p>Display your Patreon Supporters on streams with this handy extension.<br />Compatible with <span className="highlight">OBS</span>, <span className="highlight">Streamlabs OBS</span> and many more.</p>
        </header>
    );
}