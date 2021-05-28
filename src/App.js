import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pageComponents/Home';
import Starred from './pageComponents/Starred';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/starred">
        <Starred />
      </Route>

      <Route>
        <div>Error 404: Page not found</div>
      </Route>
    </Switch>
  );
}

export default App;
