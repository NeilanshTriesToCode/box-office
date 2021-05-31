import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pageComponents/Home';
import Starred from './pageComponents/Starred';
import Show from './pageComponents/Show';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/starred">
        <Starred />
      </Route>

      <Route exact path="/show/:id">
        <Show />
      </Route>

      <Route>
        <div>Error 404: Page not found</div>
      </Route>
    </Switch>
  );
}

export default App;
