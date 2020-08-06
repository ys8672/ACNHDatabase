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
						<h3 class="display-4 text-center">About This Website</h3>
						<p class="lead">Hello, Welcome to the Animal Crossing: New Horizons Database. This website is
							my attempt at creating a database of information about Animal Crossing: New Horizons. Currently,
							I have catalogued all of the art pieces, bugs, fish, fossils, deep sea creatures, K.K. Slider
							songs, and villagers into tables that are convienent to search and filter through for the
							average user. I do plan on updating my website from time to time, so look forward to updates
							in the future. </p>
					  </div>
					</div>
					<br/>
					

					<div class="card mb-3 w-100">
					  <div class="row no-gutters">
						<div class="col-md-4">
						  <img src={process.env.PUBLIC_URL + '/avatar.png'} class="card-img" alt="Picture Not Available." />
						</div>
						<div class="col-md-8">
						  <div class="card-body">
							<h3 class="card-title">About Me</h3>
							<p class="card-text">Hello! My name is Kevin, and I am the sole developer of this website. This
							website is a personal project of mine. I wanted to program a website and database about a topic I am personally
							interested in, and this is the result. I really do not want to reveal too much about myself personally, but I will say 3
							fun facts about myself. Also, if you want to contact me, you can message my Discord: CapK#5880.</p>
							<ol>
							  <li>I am an avid Nintendo fan, and my favorite Switch games are Splatoon 2, FE3H, and XC2. If you want to visit my Animal Crossing island, my Dream Code is DA-1067-3201-6546.</li>
							  <li>I have played the piano for over 10 years. Although I don't play much these days, my proudest moment was performing Chopin Polonaise Op.53 at a local recital.</li>
							  <li>I love reading romance, historical fiction, and fantasy novels. My favorite series of 2020 include The Bronze Horseman Triology and The Daevabad Triology. </li>
							</ol> 
						  </div>
						</div>
					  </div>
					</div>
				</div>								
			</div>	
			
		)
	}
}

export default About;