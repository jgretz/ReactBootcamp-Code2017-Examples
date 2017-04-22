import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/app';
import Home from './components/home';
import NotFoundPage from './components/not_found';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
