// import {NavLink} from "react-router-dom";
import {Link} from "react-router-dom";

let ActiveLink = 'activeLink'



export default function Nav() {
  return (
    <nav id="main-menu" aria-label="Main navigation">
    {/* <button className="menu-toggle"><i className="fa-solid fa-bars"></i></button> */}
    <ul className="menu">
      <Link to="/" className="nav-link">PROJECTS</Link>
      <span className="nav-link disabled" aria-disabled="true">EMPLOYMENT</span>
      <Link to="/education" >EDUCATION</Link>
    </ul>
  </nav>

  );
}