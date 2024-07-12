import {Link} from "react-router-dom";
import Nav from "./Nav";


export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="widthControl flex-container" id="header">
    
       <p id="copywrite">All rights reserved © Andrew Barker {currentYear}</p>
       <Nav />
    </footer>
  );
}

