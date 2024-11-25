import { useState, useEffect } from "react";
import SocialBar from "./SocialBar";

export default function MainBody() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      fetch("https://cms.barksbytesdev.com/api/projects")
        .then((res) => res.json())
        .then((data) => {
          // Reorder the projects based on the custom order
          const reorderedProjects = reorderProjectsCustom(data);
          setProjects(reorderedProjects);
        });
    };
    getProjects();
  }, []);

  // Function to reorder projects in a specific custom order
  const reorderProjectsCustom = (projects) => {
    const customOrder = [
      "WisDM",
      "Password Generator",
      "MuseLab",
      "Portfolio CMS",
      "White Witch",
      "Castle Seige"
    ];

    return projects.sort((a, b) => {
      const indexA = customOrder.indexOf(a.title);
      const indexB = customOrder.indexOf(b.title);

      // If a project is not found in the custom order, leave it at the end
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;

      return indexA - indexB; // Sort according to the custom order
    });
  };

  return (
    <div>
      <h1 className="sr-only">Andrew Barker - Full-Stack Developer</h1>
      <SocialBar />

      <main className="widthControl" id="main">
        <div id="heroText">
          <p>Hello there! I'm</p>
          <h2>Andrew Barker.</h2>
          <p>
            I’m a Full-Stack Web Developer. My portfolio is growing, and I
            always look for new things to build and learn.
          </p>
          <p>
            I love clean, intuitive designs and strive to create seamless
            interactive experiences.
          </p>
        </div>

        {/* <!-- Portfolio Items --> */}
        <div className="basic-container">
          {projects.map((item) => (
            <div key={item.id}>
              <div className="basic-item">
                <h2>{item.title}</h2>
                <img
                  src={item.image}
                  className="projectImage"
                  alt="Screenshot of the application"
                />
                <p>
                  <a target="_blank" href={item.url}>
                    {item.title}
                  </a>
                </p>
                <p>{item.content}</p>
              </div>
              {item.skills.map((skill) => (
                <div key={skill.id} className="inline-style">
                  <div>
                    <p id="skill-name" data-title={skill.name}>
                      <img
                        className="logo-style"
                        src={`http://cms.barksbytesdev.com/storage/${skill.logo}`}
                        alt={skill.name}
                      />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div id="goodbye">
          <h2>Thanks for visiting! Reach out to me on Linkedin</h2>
          <a
            href="https://www.linkedin.com/in/andrew-james-barker/"
            target="_blank"
          >
            <img
              src="images/LinkedIn.png"
              width="31"
              alt="Linked in logo characters"
            />
          </a>
        </div>
      </main>

      <div id="bigPortrait">
        <img
          id="portraitImg"
          src="images/MePhotoSarahC.jpg"
          width="965"
          alt="side view photograph of man (Andrew) with a brick background"
        />
        <div id="skillDescription"></div>
      </div>
    </div>
  );
}
