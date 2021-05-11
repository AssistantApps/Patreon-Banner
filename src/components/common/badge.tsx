
import React from 'react';

import { Lock } from './svg/lock';

interface IProps { }

export const ProBadge: React.FC<IProps> = () => {

    return (
        <div className="absolute right-0 top-0">
            <div className="badge badge-sm ml-2">
                <Lock />
                <div className="uppercase font-medium leading-4">Pro</div>
            </div>
        </div>
    );
}