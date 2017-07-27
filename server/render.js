import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import helmet from 'react-helmet';
import { render } from 'react-dom';
import { StaticRouter as Router, matchPath } from 'react-router';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../src/js/redux/reducers';
import thunk from '../src/js/redux/middleware/thunk';

import App from '../src/js/app';
import routeBank from '../src/js/routes';

module.exports = function(app) {
  const store = createStore(reducers, {}, applyMiddleware(thunk));

  app.get('*', (req, res) => {
      let foundPath = null;
      let { path, component } = routeBank.routes.find(
          ({ path, exact }) => {
              foundPath = matchPath(req.url,
                  {
                      path,
                      exact,
                      strict: false
                  }
              )
              return foundPath;
          }) || {};

      if (!component) {
        component = {};
      }

      const onFinish = () => {
        let preloadedState = store.getState();
        let context = {};
        const html = ReactDOM.renderToString(
            <Provider store={store}>
                <Router context={context} location={req.url}>
                    <App />
                </Router>
            </Provider>
        );
        const helmetData = helmet.renderStatic();
        if (context.url) {
          res.redirect(context.status, 'http://' + req.headers.host + context.url);
        } else if (foundPath && foundPath.path == '/404') {
          res.status(404).send(renderFullPage(html, preloadedState, helmetData))
        } else {
          res.send(renderFullPage(html, preloadedState, helmetData))
        }
      };

      if (component.fetchData) {
        component.fetchData({ store, params: (foundPath ? foundPath.params : {}) })
          .then(onFinish).catch((err) => {
            console.e('Error', err);
            onFinish();
          });
      } else {
        onFinish();
      }
  });
};


const renderFullPage = (html, preloadedState, helmet) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <base href="/">
          <meta name="fragment" content="!">

          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">

          <link rel="apple-touch-icon-precomposed" sizes="57x57" href="assets/images/favicon/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/images/favicon/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/images/favicon/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets/images/favicon/apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon-precomposed" sizes="60x60" href="assets/images/favicon/apple-touch-icon-60x60.png" />
          <link rel="apple-touch-icon-precomposed" sizes="120x120" href="assets/images/favicon/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon-precomposed" sizes="76x76" href="assets/images/favicon/apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon-precomposed" sizes="152x152" href="assets/images/favicon/apple-touch-icon-152x152.png" />
          <link rel="icon" type="image/png" href="assets/images/favicon/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="assets/images/favicon/favicon-16x16.png" sizes="16x16" />

          <meta name="theme-color" content="#00C972">

          <link rel="stylesheet" href="assets/styles/app.bundle.css"/>
          <link rel="manifest" href="manifest.json">
        </head>
        <body>
          <div id="app">${html}</div>

          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>
          <script src="assets/scripts/app.bundle.js"></script>
        </body>
      </html>
    `;
};
