import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import * as route from './constants/route';
import { ScrollToTop } from './components/core/scroll/scrollToTop';
import { setBodyLoadingClass } from "./helper/documentHelper";

import { HomePage } from './pages/home';
import { ConfigPageContainer } from './pages/config/configPageContainer';
import { ExamplePageContainer } from './pages/example/exampleContainer';
import { DisplayPage } from './pages/display/displayContainer';
import { SuccessfulPatreonLoginPage } from './pages/successfulPatreonLogin';
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
                    <Route path={route.config} component={ConfigPageContainer} />
                    <Route path={route.example} component={ExamplePageContainer} />

                    <Route path={route.displayWithGuid} component={DisplayPage} />
                    <Route path={route.display} component={DisplayPage} />

                    <Route path={route.patreonSuccess} component={SuccessfulPatreonLoginPage} />

                    <Route path={route.errorWithCode} component={ErrorPage} />
                    <Route path={route.error} component={ErrorPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </ScrollToTop>
        </BrowserRouter>
    );
}

initializeWithConfig(<App />);