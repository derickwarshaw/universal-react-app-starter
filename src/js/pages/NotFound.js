import React from "react";

import { Hero } from '../components';

export default class NotFound extends React.Component {
  render() {
    return (
      <div>
        <Hero>
          <h1>404 Not Found</h1>
        </Hero>
      </div>
    );
  }
}
