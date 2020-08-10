import React from 'react';
import './index.css';
import { Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { LinkContainer } from 'react-router-bootstrap';

const TITLE = 'AC:NH About'

class About extends React.Component{	
	render(){
		return(
			<div className='frontpagepadding'>
				<Helmet>
					<title>{ TITLE }</title>
				</Helmet>

				<div>
					<div class="jumbotron jumbotron-fluid">
					  <div class="container">
						<h1 class="display-4 text-center"><b>About This Website</b></h1>
						<p class="lead">Hello, Welcome to the Animal Crossing: New Horizons Database. This website is
							my attempt at creating a database of information about Animal Crossing: New Horizons. Currently,
							I have catalogued art pieces, bugs, construction, fish, fossils, recipes, deep sea creatures, K.K. Slider
							songs, and villagers into tables that are convienent to search and filter through for the
							average user. I do plan on updating my website from time to time, so look forward to updates
							in the future. </p>
						<p class="lead">Disclaimer: I do not own Animal Crossing: New Horizons, the assets on this website,
						or anything related to the Animal Crossing franchise. All rights are belong to Nintendo.</p>
					  </div>
					</div>
					<br/>
					

					<div class="card mb-3 w-100 border-secondary">
					  <div class="row no-gutters">
						<div class="col-md-4">
						  <img src={process.env.PUBLIC_URL + '/avatar.png'} class="card-img" alt="Picture Not Available." />
						</div>
						<div class="col-md-8">
						  <div class="card-body">
							<h1 class="card-title" className="text-center"><b>About Me</b></h1>
							<p class="card-text">Hello! My name is Kevin, and I am the sole developer of this website. This
							website is a personal project of mine. I wanted to program a website and database about a topic I am personally
							interested in, and this is the result. I really do not want to reveal too much about myself personally, but I will say 3
							fun facts about myself. Also, if you want to contact me, you can message my Discord: CapK#5880.</p>
							<ol>
							  <li>I am an avid Nintendo fan, and my favorite Switch games are Splatoon 2, FE3H, and XC2. If you want to visit my Animal Crossing island, my Dream Code is DA-1067-3201-6546.</li>
							  <li>I have played the piano for over 10 years. Although I don't play much these days, my proudest moment was performing Chopin Polonaise Op.53 at a local recital.</li>
							  <li>I love reading romance, historical fiction, and fantasy novels. My favorite series include The Bronze Horseman Triology and The Daevabad Triology. </li>
							</ol> 
						  </div>
						</div>
					  </div>
					</div>
					<br/>
					
					<div class="card w-100 border-primary">
					  <div class="card-body">
						<h1 class="card-title" className="text-center"><b> Special Shoutouts To: </b></h1>
						<p class="card-text"><a href="http://acnhapi.com/">ACNH API</a> for the for helping me with getting most of the information I needed to make this website,
							including art pieces, bugs, fish, fossils, items, sea creatures, songs, and villagers. I would
							have had a way harder time creating the database for this website otherwise. Thank you. </p>
						<p class="card-text"><a href="https://github.com/acdb-team/google-sheets-to-json">ACDB-Team</a> for the information on recipes and construction. Thank you. </p>
					  </div>
					</div>
					<br/>
					
					<div class="border border-dark">
						<h1 className="text-center"> <b> Technical Information </b> </h1>
						<div class="card-deck abouttech">
							<div class="card border-danger">
								<div class="card-body">
								  <h5 class="card-title" className="text-center"><b>Tools Used</b></h5>
								  <p class="card-text">
								  <ol>
									<li>Python-Flask for back-end</li>
									<li>ReactJS/Bootstrap for front-end</li>
									<li>SQLAlchemy/PostGreSQL for database</li>
									<li>Google Cloud Platform for hosting</li>
								  </ol>
								  </p>
								</div>
							 </div>
							 <div class="card border-warning">
								<div class="card-body">
								  <h5 class="card-title" className="text-center"><b>GitHub</b></h5>
								  <p class="card-text">I have made all code for this database and website open-sourced. Feel free to 
								  clone my repository and give me feedback. You can contact me via Discord: CapK#5880. </p>
								  <div style={{display: 'flex', justifyContent: 'center'}}>
									<a href="https://github.com/shengye000/ACNHDatabase" class="btn btn-info">GitHub Repository</a>
								  </div> 
								</div>
							 </div>
							 <div class="card border-success">
								<div class="card-body">
								  <h5 class="card-title" className="text-center"><b>Postman API</b></h5>
								  <p class="card-text">I have also made a RESTful API for all of the pages. This will include all
								  the data shown on the tables in JSON format. Feel free to use however you like. </p>
								  <div style={{display: 'flex', justifyContent: 'center'}}>
									<a href="" class="btn btn-info">Postman API</a>
								  </div> 
								</div>
							 </div>
						</div>
						<br/>
					</div>
					<br/>
					
					
					
				</div>								
			</div>	
			
		)
	}
}

export default About;