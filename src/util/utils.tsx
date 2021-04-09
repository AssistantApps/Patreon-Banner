import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { DependencyInjectionProvider } from '../integration/dependencyInjection';
import { isDev } from '../helper/devDetect';
import configDevJson from '../Config/config.json';
import configProdJson from '../Config/config.production.json';

declare global {
  interface Window {
    config: any;
    Twitch: any
    registration: any
  }
}

export const initializeWithConfig = (component: ReactNode) => {
  const configJson = isDev() ? configDevJson : configProdJson;
  window.config = configJson != null
    ? configJson
    : defaultConfig;

  if (window.config.consoleLogDebug) console.log('Config', window.config);

  const config = {
    analyticsEnabled: window.config.googleAnalyticsEnabled,
    loggingEnabled: window.config.consoleLogDebug,
  }

  const app = (
    <DependencyInjectionProvider {...config}>
      <React.StrictMode>
        {component}
      </React.StrictMode>
    </DependencyInjectionProvider>
  );
  ReactDOM.render(app, document.getElementById('assistantApp-Patreon'));
}



export const defaultConfig = {
  googleAnalyticsEnabled: false,
  consoleLogDebug: true,
  useServiceWorker: false,
  reportWebVitals: false,
  apiUrl: "https://api.assistantapps.com",
}