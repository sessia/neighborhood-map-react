import React, {Component} from 'react';
import menuIcon from '../menu-button.svg';

class Header extends Component {

render() {
  const{openMenu} = this.props

return(
      <header>
      <div className="menu" onClick={(event) => openMenu(event)} tabIndex="0" aria-label="filter menu">
            <img src={menuIcon} alt=" filtermenu" className="menu-icon" title="Filter menu" />
      </div>
      	<h1 tabIndex ={0} className = "title"> The best of Florence</h1>
  		</header>
);

}
}
export default Header;
