import {useState, useEffect} from "react";
import SocialBar from "./SocialBar";

export default function  EducationList() {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const getEducation = async () => {
      fetch('https://cms.barksbytesdev.com/api/education')
      .then(res => res.json())
      .then(data => setEducation(data));
    }
   getEducation();
  }, []);

// eduction section of site //

  return (
    <div>
      <SocialBar />
       <main className="widthControl" id="mainSidePages">
        <div className="basic-container">
        {education.map(item => (
          <div className="basic-item" key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.graduated_at}</p>
            <p className="gpa-text">GPA: 3.9</p>
            <p><a href={item.url}>{item.content}</a></p>
          </div>
        ))}
        </div>
       </main>

    </div>
  );
};

