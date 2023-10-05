import {useState, useEffect} from "react";
import {parse, compareDesc, format} from 'date-fns';
import SocialBar from "./SocialBar";

export default function EmploymentList() {
  const [employment, setEmployment] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEmployment = async () => {
      try {
        const res = await fetch('https://cms.barksbytesdev.com/api/employment');
        if (!res.ok) {
          throw Error('Could not fetch the data');
        }
        const data = await res.json();
        // Sorting the employment data by started_at date in descending order
        const sortedData = data.sort((a, b) => {
          const dateA = parse(a.started_at, "dd/MM/yyyy h:mm aa", new Date());
          const dateB = parse(b.started_at, "dd/MM/yyyy h:mm aa", new Date());
          return compareDesc(dateA, dateB);
        });
        setEmployment(sortedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    getEmployment();
  }, []);

  return (
    <div>
      <SocialBar />
      <main className="widthControl" id="mainSidePages">
        <div className="basic-container">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {employment.map(item => (
            <div className="basic-item" key={item.id}>
              <h2>{item.title}</h2>
              <p>
                From: {format(parse(item.started_at, "dd/MM/yyyy h:mm aa", new Date()), 'MMMM yyyy')}
                To: {item.ended_at ? format(parse(item.ended_at, "dd/MM/yyyy h:mm aa", new Date()), 'MMMM yyyy') : 'Present'}
              </p>
              <p><a href={item.url}>{item.employer}</a></p>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
