import React from "react";
import { BrowserRouter } from "react-router-dom";

import { initializeWithConfig } from "./util/utils";
import { PatreonPanelContainer } from './components/patreon/panel/patreonPanelContainer';

import './scss/main.scss';
import './scss/custom.scss';

initializeWithConfig(
    <BrowserRouter>
        <PatreonPanelContainer />
    </BrowserRouter>
);