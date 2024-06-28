// import { escape } from "querystring";
import {useState, useEffect} from "react";
import SocialBar from "./SocialBar";
export default function  MainBody() {

const [projects, setProject] = useState([]);

useEffect(() => {
    const getProject = async () => {
    fetch('https://cms.barksbytesdev.com/api/projects')
    .then(res => res.json())
    .then(data => setProject(data));
    }
    getProject();
}, []);

// console.log({});

// main projects section of site //


return (

<div>
<SocialBar />

    {/* Main Hero */}

    <main className="widthControl" id="main">
        
        <div id="heroText">
            <p>Hello there! I'm</p><h2>Andrew Barker.</h2>
            <p>I’m a Full-Stack Web Developer. My portfolio is growing, and I always look for new things to build and learn.</p>
            <p>I love clean, intuitive designs and strive to create seamless interactive experiences.</p>
        </div>

        {/* <!-- Portfolio Items --> */}

       
        <div className="basic-container">
        {projects.map(item => (
            <div key={item.id}>
            <div className="basic-item">
                <h2>{item.title}</h2>
                <img  src={item.image} className="projectImage" alt="Screenshot of the application"></img>
                <p><a target="_blank" href={item.url}>{item.title}</a></p>
                <p>{item.content}</p>
            </div>
            {item.skills.map(skill => (
                <div key={skill.id} className="inline-style">
                    <div>
                        <p id="skill-name" data-title={skill.name}><img className="logo-style" src={`http://cms.barksbytesdev.com/storage/${skill.logo}`}   alt={skill.name}/></p>
                    </div>
                </div>
        ))}
            </div>
    ))}
        </div>
        <div id="goodbye">
        <h2 >Thanks for visiting! Reach out to me on Linkedin</h2>
        <a href="https://www.linkedin.com/in/andrew-james-barker/" target="_blank"><img src="images/LinkedIn.png" width="31" alt="Linked logo characters i n"></img></a>
      </div>
    </main>

    <div id="bigPortrait">
        <img id="portraitImg" src="images/MePhotoSarahC.jpg" width="965" alt="side view photograph of man (Andrew) with a brick background"></img>
        <div id="skillDescription">
        </div>
    </div>

</div>

);

}