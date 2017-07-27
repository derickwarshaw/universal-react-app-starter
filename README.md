# 🚀 Simple universal react app starter

To solve the classic SEO problems of the SPA (Single Page applications) we can use the Isomorphic (Universal) approach.
By prerendering the page, on the server, we allow the search engines to crawl the page.

### Works like this
- The browser points to a route
- The server renders the app for that route (waiting to fetch any async data if needed)

Each route's main component can have a **static fetchData** method

This method receives the Store and its useful to fetch initial data of the page, which will be saved in the Store's state.

For **all the async requests** of data that is **not crucial for first render** of the page **should go into component's lifecylce methods** like componentWillMount()

(Check the page About as an example)

- The browser obtains the rendered page with the data in the Redux Store
- From now on the browser page acts like a SPA with all the benefits & without jeopardising the page's SEO


### Tech
- The front-end is built with React, Redux, React-router-v4, Webpack, Helmet, ...
- The server side with node, express, React & Webpack.

### Building
To build invoke the following commands:

```
  npm install
  npm run build:client
  npm run build:server
```

### Development
To run on development mode invoke the following command:

```
  npm run start
```


### Production
To run on production mode invoke the following command:

```
  npm run prod
```
