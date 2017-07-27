import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import RedirectWithStatus from './redirect-w-status';
import routeConfig from './routes';
import { Navbar } from './components';

export default class App extends React.Component {
  render() {
    const routes = routeConfig.routes.map(({ path, component, exact }, i) =>
        <Route key={Math.random() + 'ROUTE_'} exact={exact} path={path} component={component} />
    );
    const redirects = routeConfig.redirects.map(({ from, to, status }, i) =>
        <RedirectWithStatus key={Math.random() + 'REDIRECT_'} from={from} to={to} status={status} />
    );
    return (
      <div>
        <Navbar />
        <div>
          <Switch>
            {routes}
            {redirects}
          </Switch>
        </div>
      </div>
    );
  }
}
