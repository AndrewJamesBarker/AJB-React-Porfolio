import {Link} from "react-router-dom";
import Nav from "./Nav";


export default function Header() {
  return (
    <header className="widthControl flex-container" id="header">
      <a href="/"><img id="logoAJB" src="images/Good_Logo_AJB.png" width="95" height="140" alt="a logo comprised of the initials AJB within a diamond shape border"></img></a>
      <Nav />
    </header>
  );
}

