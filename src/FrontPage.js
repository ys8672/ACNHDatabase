import React from 'react';
import './index.css';
import { Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { LinkContainer } from 'react-router-bootstrap';

const TITLE = 'AC:NH Database'

class FrontPage extends React.Component{	
	render(){
		return(
			
			<div className='frontpagepadding'>
				<Helmet>
					<title>{ TITLE }</title>
				</Helmet>
				<div>
					<br/>
					<b><h1 className='text-center'>Welcome to the Animal Crossing: New Horizons Database</h1></b>       
					<br/>
					<h3 className='text-center'>
						Hello there! Do you want to know more about Animal Crossing: New Horizons for
						the Nintendo Switch? Well look no further, because hopefully this website can help. 
						Click on any of the links below to learn more about that specific topic. 
					</h3>
					<br/>
				</div>	
				
				<div className="bg" />
				<br/>
				
				<div class="card w-100 border-primary">
					<div class="card-body">
						<h5 class="card-header" className='text-center'> <b>Art</b> </h5>
						<p class="card-text" className = 'text-center'> Added in Version 1.2.0, or the Earth Day Update,
						you may find a sly fox named Jolly Redd wandering on your island. After you talk to him and he gives you a
						free (genuine) artwork, you can find him occasionally on your island's north secret beach, docked on his
						boat named Jolly Redd's Treasure Trawler. He will sell you paintings or sculptures to decorate
						or donate to the Museum. Be careful though, as his artworks can be forgeries. </p>
						<div class="text-center">
						<LinkContainer to="/art">
							<Button variant="outline-primary" size="lg"> Click Here To Learn More </Button>
						</LinkContainer>
						</div>
					</div>
				</div>
				<br/>
				<div class="card w-100 border-secondary">
					<div class="card-body">
						<h5 class="card-title" className='text-center'> <b>Bugs</b> </h5>
						<p class="card-text" className = 'text-center'> From dangerous scorpions to beautiful
						butterflies, different bugs will appear on your island depending on your time and month. Use a net to catch these 
						creatures for Blather's Museum, your personal collection, your Critterpedia, or even for Flick!</p>
						<div class="text-center">
						<LinkContainer to="/bugs">
							<Button variant="outline-secondary" size="lg"> Click Here To Learn More </Button>
						</LinkContainer>
						</div>
					</div>
				</div>
				<br/>
				<div class="card w-100 border-success">
					<div class="card-body">
						<h5 class="card-title" className='text-center'><b>Fish</b></h5>
						<p class="card-text" className = 'text-center'> Swimming underwater in bodies of water, you can find fish
						by their shadows in rivers, lakes, and near the coast. Craft a fishing rod and catch some of these fish
						for Blather's Museum, your personal collection, your Critterpedia, or even for C. J. </p>
						<div class="text-center">
						<LinkContainer to="/fish">
							<Button variant="outline-success" size="lg"> Click Here To Learn More </Button>
						</LinkContainer>
						</div>
					</div>
				</div>		
				<br/>
				<div class="card w-100 border-danger">
					<div class="card-body">
						<h5 class="card-title" className='text-center'><b>Fossils</b></h5>
						<p class="card-text" className = 'text-center'> Re-spawning every day at different locations, fossils are
						a fun collectible you can dig up. Simply use a shovel on cracks on the ground. Give the fossils to Blathers
						to evaluate and you can see the bones of pre-historic animals. Be careful though, because
						your friends may have planted a pitfall for you to fall into if they have visited your island. </p>
						<div class="text-center">
						<LinkContainer to="/fossils">
							<Button variant="outline-danger" size="lg"> Click Here To Learn More </Button>
						</LinkContainer>
						</div>
					</div>
				</div>
				<br/>
				<div class="card w-100 border-warning">
					<div class="card-body">
						<h5 class="card-title" className='text-center'><b>Sea Creatures</b></h5>
						<p class="card-text" className = 'text-center'> Added in the Wave One of the Summer Update of 2020, you can
						go to Nook's Cranny and buy a swimsuit to swim in the ocean. A key element also included diving for more
						sea creatures previously inaccessible via a fishing rod. You may have to be quick, as these animals
						can swim away from you if you are not fast enough to catch them! </p>
						<div class="text-center">
						<LinkContainer to="/sea">
							<Button variant="outline-warning" size="lg"> Click Here To Learn More </Button>
						</LinkContainer>
						</div>
					</div>
				</div>
				<br/>
				<div class="card w-100 border-info">
					<div class="card-body">
						<h5 class="card-title" className='text-center'><b>Songs</b></h5>
						<p class="card-text" className = 'text-center'> After reaching three stars on your island, talk
						to Isabelle to invite K. K. Slider for a concert. Afterwards, he will visit your island every Saturday.
						By then, you can talk to the talented K. K. Slider and request for any song to listen to while the credits roll.</p>
						<div class="text-center">
						<LinkContainer to="/songs">
							<Button variant="outline-info" size="lg"> Click Here To Learn More </Button>
						</LinkContainer>
						</div>
					</div>
				</div>
				<br/>
				<div class="card w-100 border-dark">
					<div class="card-body">
						<h5 class="card-title" className='text-center'><b>Villagers</b></h5>
						<p class="card-text" className = 'text-center'> With around 400 villagers in the game, these NPCs can
						move onto your island to live in and is sure to brighten up your town. </p>
						<div class="text-center">
						<LinkContainer to="/villagers">
							<Button variant="outline-dark" size="lg"> Click Here To Learn More </Button>
						</LinkContainer>
						</div>
					</div>
				</div>	
				<br/>
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<LinkContainer to="/about">
						<Button variant="outline-dark" size="lg"> About This Website </Button>
					</LinkContainer>	
				</div> 
				<br/>


			</div>
		)
	}
}

export default FrontPage;