import {useState, useEffect} from "react";
import SocialBar from "./SocialBar";

export default function  EmploymentList() {
  const [employment, setEmployment] = useState([]);

  useEffect(() => {
    const getEmployment = async () => {
      try {
        const res = await fetch('https://cms.barksbytesdev.com/api/employment');
        const data = await res.json();
        // handle sorting and setting data here...
      } catch (error) {
        console.error("Failed to fetch data: ", error);
        // handle error in UI, maybe set an error state
      }
    }
    getEmployment();
  }, []);
  
// employment section of site //

  return (
    <div>
      <SocialBar />
       <main className="widthControl" id="mainSidePages">
        <div className="basic-container">
        {employment.map(item => (
          <div className="basic-item" key={item.id}>
            <h2>{item.title}</h2>
            <p>From: {item.started_at} To: {item.ended_at}</p>
            <p><a href={item.url}>{item.employer}</a></p>
            <p>{item.content}</p>
            
          </div>
        ))}
        </div>
       </main>

    </div>
  );
};

