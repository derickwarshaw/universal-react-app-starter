import React from "react";
import { Helmet } from 'react-helmet';

import Hero from "../components/Hero";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="About Page description" />
        </Helmet>
        <Hero>
          <h1>Home Page</h1>
        </Hero>
      </div>
    );
  }
}

export default Home;
