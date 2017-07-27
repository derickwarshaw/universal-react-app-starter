import React from "react";

export default class Hero extends React.Component {
  render() {
    return (
      <div className="hero simple-hero">
        <div className="space-holder"></div>
        <div className="hero-content">
          <div className="hero-content-inner">
            <div className="wrapper">
              <div className="container-md-m">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
