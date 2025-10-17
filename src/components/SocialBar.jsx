// import { escape } from "querystring";
import {useState, useEffect} from "react";

export default function  SocialBar() {


    // social media component //
    
return (

<div className="socialBar">
    <div className="relativeContainer">
        <div className="widthControl" id="media-menu">
            {/* <button className="media-toggle">Social/Git</button> */}
            <ul className="mediaLogos">
                <li><a href="https://github.com/AndrewJamesBarker" target="_blank"><img width="31" src="images/github_logo.png"  alt="Github"></img></a></li>
                <li><a href="https://www.linkedin.com/in/andrew-james-barker/" target="_blank"><img src="images/LinkedIn.png" width="31" alt="LinkedIn"></img></a></li>
                <li><a href="https://twitter.com/abarkshighhorse" target="_blank"><img src="images/twitter_logo.png" width="31" alt="Twitter"></img></a></li>
                <li><a href="https://www.instagram.com/mus.art.barks/" target="_blank"><img src="images/insta_logo.png" width="31" alt="Instagram"></img></a></li>
            </ul>
        </div>
    </div>
</div>
);
}