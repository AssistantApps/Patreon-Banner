import React from 'react';
import { site } from '../../constants/site';
import { BasicLink } from '../core/link';
import { BasicImage } from '../core/image';

interface IProps {
}

export const Header: React.FC<IProps> = (props: IProps) => {
    return (
        <header id="header" className="alt">
            <span className="logo"><BasicImage imageUrl="assets/img/logo.svg" alt="" /></span>
            <h1>Patreon Banner</h1>
            <p>Display your Patreon Supporters on streams with this handy extension.<br />Compatible with OBS, Streamlabs OBS and many more.</p>
            <i>Built by <BasicLink href={site.stream.twitch}>KhaozTopsy</BasicLink> as part of the <BasicLink href={site.assistantApps.website}>AssistantApps collection</BasicLink></i>
        </header>
    );
}