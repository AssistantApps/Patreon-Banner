import React, { ReactNode } from 'react';

interface ITestStreamWindowProps {
    children: ReactNode;
}

export const TestStreamWindow: React.FC<ITestStreamWindowProps> = (props: ITestStreamWindowProps) => {
    return (
        <div className="display-test">
            <div className="display-test-inner">
                <h2 className="m0">Your awesome stream!</h2>
            </div>
            <div className="display-test-container">
                {props.children}
            </div>
        </div>
    );
}
