import SocialBar from "./SocialBar";

export default function AboutPage() {
  return (
    <div>
      <SocialBar />
      <main id="mainAbout" className="widthControl">
        <div className="basic-container">
          <div className="basic-item">
            <h1>About</h1>
            <p>
              Andrew Barker is a full-stack web developer based in Toronto, a
              guitarist, music educator, and creative tinkerer.{" "}
            </p>
            <p>
              He earned a Bachelor’s degree in Jazz Performance with Honours and
              a Graduate Certificate in Web Development with Honours from Humber
              College.
            </p>
            <p>
              Andrew enjoys linking ideas and helping others turn their visions
              into online realities, whether by creating websites, developing
              applications, or organizing and migrating data. He is skilled at
              demystifying technical concepts in simple language and finds joy
              in helping people build meaningful projects.
            </p>

            <h2>Education</h2>
            <ul>
              <li>
                Bachelor’s degree in Jazz Performance (Honours) — Humber College
              </li>
              <li>
                Graduate Certificate in Web Development (Honours) — Humber
                College
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
