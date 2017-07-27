import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import RedirectWithStatus from './routes/redirect-w-status';
import { routes, redirects } from './routes';
import { Navbar } from './components';

export default class App extends React.Component {
  render() {
    const routeElements = routes.map(({ path, component, exact }, i) =>
        <Route key={Math.random() + 'ROUTE_'} exact={exact} path={path} component={component} />
    );
    const redirectElements = redirects.map(({ from, to, status }, i) =>
        <RedirectWithStatus key={Math.random() + 'REDIRECT_'} from={from} to={to} status={status} />
    );
    return (
      <div>
        <Navbar />
        <div>
          <Switch>
            {routeElements}
            {redirectElements}
          </Switch>
        </div>
      </div>
    );
  }
}
