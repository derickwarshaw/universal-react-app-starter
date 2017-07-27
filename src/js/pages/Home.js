import React from "react";
import { Helmet } from 'react-helmet';

import Hero from "../components/Hero";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <Hero>
          <h1>Home Page</h1>
        </Hero>
      </div>
    );
  }
}

export default Home;
