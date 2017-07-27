import React from "react";

import Locale from "../locale";

export default class Layout extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    // On Mount
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
