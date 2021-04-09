import React from 'react';

import './_patreonButton.scss';

interface IPatreonButtonProps {
    onClick?: () => void;
}

export const PatreonButton: React.FC<IPatreonButtonProps> = (props: IPatreonButtonProps) => {
    return (
        <button className="patreon-btn" color="primary" tabIndex={0} type="submit" onClick={() => props?.onClick?.()}>
            <div tabIndex={-1} className="inner"></div>
            <div className="text">Login with Patreon</div>
        </button>
    );
}