import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Header extends Component {

  static propTypes = {}
	state = {}


  render(){

    const{onMenuClick} = this.props

    return(
      <header>
      	<button id="menu" tabIndex = {0}
          aria-label="Toggle side menu" className="toggle-menu" onClick ={(event) => onMenuClick(event)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"></path>
          </svg>
    	  </button>
      	<h1 tabIndex ={0} className = "title"> The best of Florence</h1>

  		</header>
    );
  }
};
export default Header;
