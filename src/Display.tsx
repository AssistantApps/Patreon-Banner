import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import { initializeWithConfig } from "./util/utils";
import { DisplayPage } from './pages/display/displayContainer';

import './scss/main.scss';
import './scss/custom.scss';

initializeWithConfig(
    <BrowserRouter>
        <Switch>
            <DisplayPage />
        </Switch>
    </BrowserRouter>
);