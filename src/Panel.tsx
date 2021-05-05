import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import { initializeWithConfig } from "./util/utils";
import { PatreonPanel } from './components/patreon/panel/patreonPanel';

import './scss/main.scss';
import './scss/custom.scss';

initializeWithConfig(
    <BrowserRouter>
        <PatreonPanel />
    </BrowserRouter>
);