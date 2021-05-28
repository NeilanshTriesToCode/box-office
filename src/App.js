import React from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        This is the homepage
      </Route>

      <Route exact path="/starred">
        This is starred
      </Route>

      <Route>Error 404: Page not found</Route>
    </Switch>
  );
}

export default App;
