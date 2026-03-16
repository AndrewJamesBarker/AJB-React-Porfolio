import {useState, useEffect} from "react";
import { parse, compareDesc } from 'date-fns';
import SocialBar from "./SocialBar";

export default function  EmploymentList() {
  const [employment, setEmployment] = useState([]);

  useEffect(() => {
    const getEmployment = async () => {
      fetch('https://cms.barksbytesdev.com/api/employment')
      .then(res => res.json())
      .then(data => setEmployment(data));
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
            <p className="textLeft">{item.content}</p>
            
          </div>
        ))}
        </div>
       </main>

    </div>
  );
};

