# 🚀 Simple Universal React app starter
To solve the classic SEO problems of the SPA (Single Page applications) we can use the Isomorphic (Universal) approach.  
By prerendering the page on the server, we allow the search engines to properly crawl the page.


### Works like this
1. The browser points to a route  
2. The server check if any async data is needed for the Redux Store's initial state   
   - Each route's main component can have a **static fetchData** method   
   - This method receives the Store and is useful to fetch initial data of the page, which will be saved in the Store's state   
   - For **all the async requests** of data that are **not crucial for first render** of the page **should go into component's lifecylce methods** like componentDidMount()  
   - *Check the About's page as an example*  
3. The server renders the html view for that route  
   *Here is where the web crawlers will see the already rendered page*  
4. The browser obtains the fully rendered page and with the async data already in the Redux Store's state
5. From now on the page acts like a SPA with all the benefits of React and without jeopardising the page's SEO
6. The server also generates a simple sitemap based on the routes of the app


---

### Important parts
1. **[render.js](https://github.com/jonanderdev/universal-react-app-starter/blob/master/server/render.js)** is the file where all the server prerendering is done. Basically creates a first version of the page (prefetching data if needed) with the help of React, a Store object and a static router.
2. **[index.js](https://github.com/jonanderdev/universal-react-app-starter/blob/master/src/js/index.js)** is the client (browser) entry point. Here is where your react app starts its work.
3. **[app.js](https://github.com/jonanderdev/universal-react-app-starter/blob/master/src/js/app.js)** is shared between server & client (browser). This file is the main component of the app. Inside we have the page shared elements, like navbar, and the different routes.  

---

## Tech
This app is built with React, Redux, React-router-v4, Webpack, Helmet, Sass, Postcss, ...  
The server side with node, express, React & Webpack.

---

## To start
### Clone and install dependencies
```
  git clone https://github.com/jonanderdev/universal-react-app-starter
  npm install
```

## Building and running
### Locally (development mode)
```
  npm run start
```

or like this to watch the front-end for changes:

```
  npm run start-server
  npm run start-client
```
### Production
```
  npm run prod
```

---

## Contribute
Feel free to contribute by sending a *pull request* or by opening an *issue*.
