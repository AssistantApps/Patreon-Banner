import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { DependencyInjectionProvider } from '../integration/dependencyInjection';
import prodConfigJson from '../config/config.production.json';
import devConfigJson from '../config/config.development.json';
import { getEntireConfig, getAnalytics, getConsoleLogDebug } from '../helper/configHelper';
import { isDev } from '../helper/devDetect';

export const initializeWithConfig = (component: ReactNode) => {
  const configJson = isDev() ? devConfigJson : prodConfigJson;
  window.config = configJson != null
    ? configJson
    : defaultConfig;

  if (getConsoleLogDebug()) console.log('Config', getEntireConfig());

  const config = {
    analyticsEnabled: getAnalytics(),
    loggingEnabled: getConsoleLogDebug(),
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