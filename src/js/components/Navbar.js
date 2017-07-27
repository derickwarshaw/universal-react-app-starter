import React from "react";
import { Link } from 'react-router-dom';

import Locale from "../locale";

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <ul className="links">
            <li><Link className="link" to='/'>Home</Link></li>
            <li><Link className="link" to='/about'>About</Link></li>
        </ul>
      </div>
    );
  }
}
