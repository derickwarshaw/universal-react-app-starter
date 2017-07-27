# 🚀 Simple Universal React app starter
To solve the classic SEO problems of the SPA (Single Page applications) we can use the Isomorphic (Universal) approach.
By prerendering the page, on the server, we allow the search engines to crawl the page.


### Works like this
1. The browser points to a route  
2. The server check if any async data if needed for the Redux Store's initial state  
   - Each route's main component can have a **static fetchData** method  
   - This method receives the Store and is useful to fetch initial data of the page, which will be saved in the Store's state   
   - For **all the async requests** of data that is **not crucial for first render** of the page **should go into component's lifecylce methods** like componentWillMount()  
   - *Check the About's page as an example*  
3. The server renders the html view for that route  
   *Here is where the web crawlers will see the already rendered page.  
   Page that will render with Redux initial data if it was fetched in previous step*
4. The browser obtains the fully rendered page and with the async data already in the Redux Store's state
5. From now on the page acts like a SPA with all the benefits of React without jeopardising the page's SEO
6. The server also generates a simple sitemap based on the routes of the app



### Tech
The front-end is built with React, Redux, React-router-v4, Webpack, Helmet, ...  
The server side with node, express, React & Webpack.


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
