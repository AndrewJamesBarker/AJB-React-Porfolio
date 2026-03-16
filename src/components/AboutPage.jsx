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
							Andrew Barker is a Toronto-based full-stack web developer, guitarist, music educator, and all-around creative tinkerer.
						</p>
						<p>
							He holds a Bachelor’s degree in Jazz Performance with Honours and a Graduate Certificate in Web Development with Honours, both from Humber College. Andrew enjoys connecting ideas and helping others turn their visions into reality online, whether that means creating a website, developing an application, or organizing/migrating data.
						</p>
						<p>
							He’s good at explaining technical concepts in plain English and loves helping people build meaningful things.
						</p>

						<h2>Education</h2>
						<ul>
							<li>Bachelor’s degree in Jazz Performance (Honours) — Humber College</li>
							<li>Graduate Certificate in Web Development (Honours) — Humber College</li>
						</ul>
					</div>
				</div>
			</main>
		</div>
	);
}

