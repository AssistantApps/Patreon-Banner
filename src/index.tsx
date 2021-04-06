import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import { App } from './App';
import { DependencyInjectionProvider } from './integration/dependencyInjection';
import { defaultConfig, getJSON } from './utils';

import './scss/main.scss';
import './scss/custom.scss';

declare global {
  interface Window {
    config: any;
    Twitch: any
    registration: any
  }
}
getJSON('/assets/config.json', (status: boolean, response: string) => {
  window.config = (status === true)
    ? response || {}
    : defaultConfig;

  if (window.config.consoleLogDebug) console.log('Config', window.config);

  const config = {
    analyticsEnabled: window.config.googleAnalyticsEnabled,
    loggingEnabled: window.config.consoleLogDebug,
  }

  const app = (
    <DependencyInjectionProvider {...config}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </DependencyInjectionProvider>
  );
  ReactDOM.render(app, document.getElementById('assistantApp-Patreon'));

  if (window.config.reportWebVitals) {
    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    reportWebVitals(console.log);
  }
})

