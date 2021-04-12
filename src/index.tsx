import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import * as route from './constants/route';
import { ScrollToTop } from './components/core/scroll/scrollToTop';
import { setBodyLoadingClass } from "./helper/documentHelper";

import { HomePage } from './pages/home';
import { ErrorPage } from './pages/error';
import { NotFoundPage } from './pages/notFound';
import { initializeWithConfig } from "./util/utils";

import './scss/main.scss';
import './scss/custom.scss';
import 'react-tippy/dist/tippy.css'

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
                    <Route path={route.errorWithCode} component={ErrorPage} />
                    <Route path={route.error} component={ErrorPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </ScrollToTop>
        </BrowserRouter>
    );
}

initializeWithConfig(<App />);