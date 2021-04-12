import React from 'react';

interface IProps {
}

export const Navbar: React.FC<IProps> = (props: IProps) => {
    return (
        <nav id="nav">
            <ul>
                <li><a href="#getStarted" className="noselect active" draggable={false}>Get Started</a></li>
                <li><a href="#first" className="noselect" draggable={false}>How it works</a></li>
                {/* <li><a href="#second" className="noselect" draggable={false}>Examples</a></li> */}
                <li><a href="#contact" className="noselect" draggable={false}>Contact Us</a></li>
            </ul>
        </nav>
    );
}