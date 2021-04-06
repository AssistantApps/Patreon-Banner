import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import * as route from './constants/route';
import { ScrollToTop } from './components/core/scroll/scrollToTop';
import { setBodyLoadingClass } from './helper/documentHelper';
import { HomePage } from './pages/home';
import { ConfigPageContainer } from './pages/config/configPageContainer';

export const App: React.FC = () => {
  const effectTracker = '';
  useEffect(() => {
    setTimeout(() => {
      setBodyLoadingClass(false);
    }, 100);
  }, [effectTracker]);
  return (
    <ScrollToTop>
      <Switch>
        <Route exact={true} path={route.home} component={HomePage} />
        <Route path={route.config} component={ConfigPageContainer} />
      </Switch>
    </ScrollToTop>
  );
}
