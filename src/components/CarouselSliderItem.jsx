import {useState, useEffect} from "react";

export default function CarouselSliderItem( {} ) {
  const [projects, setProject] = useState([]);

  useEffect(() => {
      const getProject = async () => {
      fetch('https://cms.barksbytesdev.com/api/projects')
      .then(res => res.json())
      .then(data => setProject(data));
      }
      getProject();
  }, []);
  return (
 <div>{projects.map(item => (
  <div key={item.id}>
  <div className="basic-item">
      <h2>{item.title}</h2>
      <img className="projectImg" src={item.image}></img>
      <p><a href={item.url}>{item.title}</a></p>
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
))}</div>
  );
}