import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';
const Header = ({loading})=>{
  return(
    <nav className="navbar navbar-default" id="halo">
        <a href="/" className="navbar-brand">
        </a>
      <ul className="nav navbar-nav">
        <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
        <li><Link to="/courses" activeClassName="active">Courses</Link></li>
        <li><Link to="/about" activeClassName="active">About {loading && <LoadingDots interval={100} dots={20}/>} </Link></li>


      </ul>
    </nav>
  );
};
Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
