import React from "react";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { Hero } from '../components';

export default class NotFound extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Sorry not found</title>
          <meta name="description" content="Sorry Not found description" />
        </Helmet>
        <Hero>
          <h1>
            Sorry, the page you were looking for doesn’t exist
            <span style={{ display: 'block' }}>🙏</span>
          </h1>
          <Link to="/" style={{ color: '#fff' }}>
            Go Home
          </Link>
        </Hero>
      </div>
    );
  }
}
