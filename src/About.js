import React from 'react';
import './index.css';
import { Helmet } from 'react-helmet';
import {BrowserView, MobileView, isBrowser, isMobile} from "react-device-detect";

const TITLE = 'AC:NH About'

class About extends React.Component{	
	
	render(){
		function page(){
		return(
		<div>
			<div class="jumbotron jumbotron-fluid">
			  <div class="container">
				<h1 class="display-4 text-center"><b>About This Website</b></h1>
				<p class="lead">Hello, Welcome to the Animal Crossing: New Horizons Database. This website is
					my attempt at creating a database of information about Animal Crossing: New Horizons. Currently,
					I have catalogued art pieces, bugs, construction, fish, fossils, items, recipes, deep sea creatures, K.K. Slider
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
				  <img src={process.env.PUBLIC_URL + '/avatar.png'} class="card-img" alt="" />
				</div>
				<div class="col-md-8">
				  <div class="card-body">
					<h1 class="card-title" className="text-center"><b>About Me</b></h1>
					<p class="card-text">Hello! I wish to stay anonymous name-wise, but I am the sole developer of this website. This
					website is a personal project of mine. I wanted to program a website and database about a topic I am personally
					interested in, and this is the result. I really do not want to reveal too much about myself personally, but I will say 3
					fun facts about myself. if you want to see my Animal Crossing: New Horizons island, my Dream Code is DA-1067-3201-6546.
					Also, if you want to contact me, you can message my Discord: CapK#5880.</p>
					<ol>
					  <li>My top 3 Switch games are Splatoon 2, Fire Emblem: Three Houses, and Xenoblade Chronicle 2.</li>
					  <li>My favorite piano piece Chopin Polonaise Op.53, and I played it many times in my college dorm piano.</li>
					  <li>I love reading romance, historical fiction, and fantasy novels. My favorite series I have read in 2020 is The Daevabad Triology. </li>
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
				<p class="Card-text"><a href="https://docs.google.com/spreadsheets/d/13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4/edit#gid=93332535">ACNH Spreadsheet</a> for
				an AC:NH database community and for all the information I needed to look up many things on the website. Thank you. I am on the Discord of this group (which you
				can find in the README of the link above) if you want to talk to me from there. I go by the tag CapK.</p>
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
							<li>Python/Flask for back-end</li>
							<li>ReactJS/Bootstrap for front-end</li>
							<li>SQLAlchemy/PostGreSQL for database</li>
							<li>Google Cloud Platform for hosting</li>
							<li>NameCheap for the free URL</li>
						  </ol>
						  </p>
						</div>
					 </div>
					 <div class="card border-warning">
						<div class="card-body">
						  <h5 class="card-title" className="text-center"><b>GitHub</b></h5>
						  <p class="card-text">I have made all code for this database and website open-sourced. Feel free to 
						  clone my repository and give me feedback via Discord. My Discord info is in the About Me Section. </p>
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
							<a href="https://www.postman.com/collections/2f87fb9670ad6eb19f90" class="btn btn-info">Postman API</a>
						  </div> 
						</div>
					 </div>
				</div>
				<br/>
			</div>
			<br/>
		</div>			
		)
	}
		
		return(
			<div>
				<Helmet>
					<title>{ TITLE }</title>
				</Helmet>
				
				<BrowserView>
					<div className='frontpagepadding'>
						{page()}
					</div>
				</BrowserView>
				
				<MobileView>
					{page()}
				</MobileView>
			</div>	
			
		)
	}
}

export default About;