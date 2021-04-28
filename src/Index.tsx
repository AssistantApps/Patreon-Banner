import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import * as route from './constants/route';
import { ScrollToTop } from './components/core/scroll/scrollToTop';
import { setBodyLoadingClass } from "./helper/documentHelper";

import { HomePresenter } from './pages/home/homePresenter';
import { ConfigPageContainer } from './pages/config/configPageContainer';
import { ExamplePageContainer } from './pages/example/exampleContainer';
import { DisplayPage } from './pages/display/displayContainer';
import { SuccessfulPatreonLoginFromTwitchPage } from './pages/successfulPatreonLoginFromTwitch';
import { AuthTokenFromServerPage } from './pages/authTokenFromServer/authTokenFromServer';
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
                    <Route exact={true} path={route.home} component={HomePresenter} />
                    <Route path={route.config} component={ConfigPageContainer} />
                    <Route path={route.example} component={ExamplePageContainer} />

                    <Route path={route.displayWithGuid} component={DisplayPage} />
                    <Route path={route.display} component={DisplayPage} />

                    <Route path={route.patreonSuccess} component={SuccessfulPatreonLoginFromTwitchPage} />

                    <Route path={route.authTokenFromServer} component={AuthTokenFromServerPage} />

                    <Route path={route.errorWithCode} component={ErrorPage} />
                    <Route exact={true} path={route.error} component={ErrorPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </ScrollToTop>
        </BrowserRouter>
    );
}

initializeWithConfig(<App />);