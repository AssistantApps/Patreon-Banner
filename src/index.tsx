import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import * as route from './constants/route';
import { ScrollToTop } from './components/core/scroll/scrollToTop';
import { setBodyLoadingClass } from "./helper/documentHelper";

import { HomePage } from './pages/home';
import { initializeWithConfig } from "./util/utils";

import './scss/main.scss';
import './scss/custom.scss';

const App: React.FC = () => {
    const effectTracker = '';
    useEffect(() => {
        setTimeout(() => {
            setBodyLoadingClass(false);
        }, 100);
    }, [effectTracker]);
    return (
        <BrowserRouter>
            <ScrollToTop>
                <Switch>
                    <Route exact={true} path={route.home} component={HomePage} />
                </Switch>
            </ScrollToTop>
        </BrowserRouter>
    );
}

initializeWithConfig(<App />);