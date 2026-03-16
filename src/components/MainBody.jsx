import { useState, useEffect } from "react";
import SocialBar from "./SocialBar";

export default function MainBody() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const resp = await fetch('/.netlify/functions/projects');
        const json = await resp.json();

        // The function returns a transformed project array. But keep compatibility
        // with direct Drupal responses (data + included) if needed.
        let mapped;
        if (Array.isArray(json)) {
          mapped = json;
        } else if (json && Array.isArray(json.data)) {
          mapped = mapDrupalResponse(json.data || [], json.included || []);
        } else if (json && Array.isArray(json.projects)) {
          mapped = json.projects;
        } else {
          mapped = [];
        }

        const reorderedProjects = reorderProjectsCustom(mapped);
        setProjects(reorderedProjects);
      } catch (err) {
        // fallback: keep projects empty and log the error
        // eslint-disable-next-line no-console
        console.error("Failed to fetch Drupal projects:", err);
      }
    };
    getProjects();
  }, []);

  // Function to reorder projects in a specific custom order
  const reorderProjectsCustom = (projects) => {
    const customOrder = [
      "WisDM",
      "White Witch",
      "Multi-Media",
      "Password Generator",
      "MuseLab",
      "Portfolio CMS",
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

  // Map Drupal JSON:API response to the app's project shape
  const mapDrupalResponse = (data = [], included = []) => {
    const includedById = Object.fromEntries((included || []).map((i) => [i.id, i]));

    return (data || []).map((item) => {
      const attrs = item.attributes || {};
      const rel = item.relationships || {};

      // Resolve image: prefer media -> file relationship
      let imageUrl = null;
      const imageRelId = rel.field_project_image?.data?.id;
      const imageIncluded = imageRelId && includedById[imageRelId];
      if (imageIncluded) {
        const fileRelId = imageIncluded.relationships?.field_media_image?.data?.id;
        const fileIncluded = fileRelId && includedById[fileRelId];
        imageUrl =
          fileIncluded?.attributes?.uri?.url ||
          fileIncluded?.attributes?.uri?.value ||
          imageIncluded.attributes?.field_media_image?.uri?.url ||
          imageIncluded.attributes?.uri?.url ||
          null;
      }

      // Resolve skills: taxonomy terms may include a field_logo media/file
      const skills = (rel.field_skills?.data || []).map((s) => {
        const inc = includedById[s.id] || {};
        let logo = null;
        const logoMediaId = inc.relationships?.field_logo?.data?.id;
        const logoFile = logoMediaId && includedById[logoMediaId];
        if (logoFile) {
          logo = logoFile.attributes?.uri?.url || logoFile.attributes?.uri?.value || null;
        } else {
          // fallback to any direct attribute
          logo = inc.attributes?.field_logo?.uri?.url || inc.attributes?.logo?.uri?.url || null;
        }

        return {
          id: s.id || inc.id || Math.random().toString(36).slice(2, 9),
          name: inc.attributes?.name || inc.attributes?.title || s.meta?.drupal_internal__target_id || "",
          logo
        };
      });

      return {
        id: item.id || attrs.drupal_internal__nid || Math.random().toString(36).slice(2, 9),
        title: attrs.title || attrs.field_title || "",
        content: attrs.field_description || attrs.body || "",
        url: attrs.field_project_link?.uri || (attrs.field_project_link?.url || null),
        image: imageUrl,
        skills
      };
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
            I’m a Full-Stack Developer focused on scalable web applications and CMS platforms, helping people bring their ideas to life on the web.
          </p>
          <p>
            I focus on creating digital products that are simple, reliable, and effective. I am also AWS Developer certified, with experience building and deploying modern cloud-based applications.
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
                <p className="project-content">{item.content}</p>
              </div>
              {item.skills.map((skill) => (
                <div key={skill.id} className="inline-style">
                  <div>
                    <p id="skill-name" data-title={skill.name}>
                      {typeof skill.logo === "string" && skill.logo ? (
                        <img
                          className="logo-style"
                          src={
                            skill.logo.startsWith("http")
                              ? skill.logo
                              : `https://cms.andrewjbarker.com${skill.logo.startsWith("/") ? "" : "/"}${skill.logo}`
                          }
                          alt={skill.name}
                        />
                      ) : null}
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
