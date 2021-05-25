import classNames from 'classnames';
import React from 'react';

export const Loading: React.FC = () => {
    return (
        <>
            <div className="full-page-loader opacity80"></div>
            <div className="full-page-loader loader">
                <div className="cssload-container">
                    <ul className="cssload-flex-container">
                        <li style={{ listStyleType: 'none' }}>
                            <img
                                src="assets/img/loader.svg"
                                draggable="false"
                                alt="loading-animation"
                            />
                            <h2 className="largeHeading">Loading...</h2>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

interface ISmallLoadingProps {
    additionalClasses?: string
}

export const SmallLoading: React.FC<ISmallLoadingProps> = (props: ISmallLoadingProps) => {
    return (
        <div className="container loader">
            <div className="row">
                <div className="col-12" style={{ textAlign: 'center' }}>
                    <img
                        src="assets/img/loader.svg"
                        draggable="false"
                        alt="loading-animation"
                        className={classNames(props.additionalClasses)}
                        style={{ height: '75px', display: 'inline' }}
                    />
                    <h2 className="largeHeading" style={{ verticalAlign: 'middle' }}>Loading...</h2>
                </div>
            </div>
        </div>
    );
}

export const TinyLoading: React.FC = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12" style={{ textAlign: 'center' }}>
                    <img
                        src="assets/img/loader.svg"
                        draggable="false"
                        alt="loading-animation"
                        style={{ height: '25px', display: 'inline', verticalAlign: 'middle', marginBottom: '5px' }}
                    />
                </div>
            </div>
        </div>
    );
}