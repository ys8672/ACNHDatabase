import React from 'react';
import './index.css';
import { Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { LinkContainer } from 'react-router-bootstrap';
import {BrowserView, MobileView} from "react-device-detect";

const TITLE = 'AC:NH Database'

class FrontPage extends React.Component{	

	render(){
		function page(){
			return(
			<div>

				
				<div>					
					<h1 className='text-center'><b> Introduction: </b></h1>
					<h4 className='text-center'>
						Hello there! Do you want to know more about Animal Crossing: New Horizons for
						the Nintendo Switch? Well look no further. We have 16 interesting pages, each with unique topics
						about this relaxing game. Go to our search page
						or click on any of the links below to learn more about that specific topic. 
					</h4>
				</div>	
				<hr/>
				
				<div>
					<h1 className='text-center'><b> Search: </b></h1>
					<div style={{display: 'flex', justifyContent: 'center'}}>
							<LinkContainer to="/search">
								<Button variant="btn btn-success" size="lg"> Go To Search Page </Button>
							</LinkContainer>
					</div>
					<br/>
				</div>
				<hr/>
				
				<h1 className='text-center'><b> Topics: </b></h1>
				<div class="card-deck">
					<div class="card border-primary bg-light ">
						<div class="card-body d-flex flex-column">
							<h5 class="card-header" className='text-center'> <b>Art</b> </h5>
							<p class="card-text" className = 'text-center'> Added in Version 1.2.0,
							you may find a sly fox named Jolly Redd wandering on your island. After you talk to him and he gives you a
							free (genuine) artwork, you can find him occasionally on your island's north secret beach to
							sell you paintings or sculptures. Be careful though, as his artworks can be forgeries. </p>

							<LinkContainer to="/art">
								<Button variant="outline-primary mt-auto" size="lg"> Learn More </Button>
							</LinkContainer>

						</div>
					</div>
					<div class="card border-secondary bg-light">
						<div class="card-body d-flex flex-column">
							<h5 class="card-title" className='text-center'> <b>Bugs</b> </h5>
							<p class="card-text" className = 'text-center'> From dangerous scorpions to beautiful
							butterflies, different bugs will appear on your island depending many factors including time and
							month. Use a net to catch these 
							creatures for Blather's Museum, your personal collection, your Critterpedia, or even for Flick!</p>

							<LinkContainer to="/bugs">
								<Button variant="outline-secondary mt-auto" size="lg"> Learn More </Button>
							</LinkContainer>

						</div>
					</div>
					<div class="card border-success bg-light">
						<div class="card-body d-flex flex-column">
							<h5 class="card-title" className='text-center'><b>Clothes</b></h5>
							<p class="card-text" className = 'text-center'> Clothing are a big part of Animal Crossing: New Horizons and
								play a big role in the customizability of your avatar. From hats, tops, socks, to other types of clothing,
								your choices of playing dress-up are nearly infinite. You can even give some clothing to your villagers
								as gifts and they may even put on some of them!</p>

							<LinkContainer to="/clothes">
								<Button variant="outline-success mt-auto" size="lg"> Learn More </Button>
							</LinkContainer>

						</div>
					</div>
					<div class="card border-danger bg-light">
						<div class="card-body  d-flex flex-column">
							<h5 class="card-title" className='text-center'><b>Construction</b></h5>
							<p class="card-text" className = 'text-center'> To decorate your island, Tom Nook can help you build various
							construction projects to make your island prettier. These include your bridges across bodies of water,
							slopes to go up levels, and even the outer style of your house! </p>

							<LinkContainer to="/construction">
								<Button variant="outline-danger mt-auto" size="lg"> Learn More </Button>
							</LinkContainer>

						</div>
					</div>
				</div>
				<br/>

				<div class="card-deck">
					<div class="card border-warning bg-light">
						<div class="card-body d-flex flex-column">
							<h5 class="card-title" className='text-center'><b>Fish</b></h5>
							<p class="card-text" className = 'text-center'> Swimming underwater in bodies of water, you can find fish
							by their shadows in rivers, lakes, and near the coast. Craft a fishing rod and catch some of these fish
							for Blather's Museum, your personal collection, your Critterpedia, or even for C. J. </p>

							<LinkContainer to="/fish">
								<Button variant="outline-warning mt-auto" size="lg"> Learn More </Button>
							</LinkContainer>

						</div>
					</div>		
					<div class="card border-info bg-light">
						<div class="card-body d-flex flex-column">
							<h5 class="card-title" className='text-center'> <b>Floors</b> </h5>
							<p class="card-text" className = 'text-center'> If you are tired of the bland flooring in
							your rooms, try spicing it up with unique flooring designs. From simple wooden floors to
							complex flooring that could move, these are sure to make your home more pretty.</p>

							<LinkContainer to="/floors">
								<Button variant="outline-info mt-auto" size="lg"> Learn More </Button>
							</LinkContainer>

						</div>
					</div>
					<div class="card border-info bg-light">
						<div class="card-body d-flex flex-column">
							<h5 class="card-title" className='text-center'><b>Fossils</b></h5>
							<p class="card-text" className = 'text-center'> Re-spawning every day at different locations, fossils are
							a fun collectible you can dig up. Simply use a shovel on cracks on the ground. Give the fossils to Blathers
							to evaluate and you can see the bones of pre-historic animals. </p>

							<LinkContainer to="/fossils">
								<Button variant="outline-info mt-auto" size="lg"> Learn More </Button>
							</LinkContainer>

						</div>
					</div>
					<div class="card border-dark bg-light">
						<div class="card-body d-flex flex-column">
							<h5 class="card-title" className='text-center'><b>Items</b></h5>
							<p class="card-text" className = 'text-center'> The second longest table, up to hundreds of items
								are used to decorate your island. From instruments to furniture to posters, these items will
								be sure to make your island look extremely pretty. (Note: Items include the houseware, wall-mounted, and misc.
								categories in your inventory.)</p>

							<LinkContainer to="/items">
								<Button variant="outline-dark mt-auto" size="lg"> Learn More </Button>
							</LinkContainer>

						</div>
					</div>
				</div>
				<br/>
				
				<div class="card-deck">
					<div class="card border-primary bg-light">
						<div class="card-body d-flex flex-column">
							<h5 class="card-title" className='text-center'><b>Reactions</b></h5>
							<p class="card-text" className = 'text-center'> From happy faces to heartbroken symbols, reactions
							can be used by all villagers and players to show their feelings. Use these to communicate with your
							friends and even take more accuracte photos with an appropriate reaction mixed in.</p>

							<LinkContainer to="/reactions">
								<Button variant="outline-primary mt-auto" size="lg"> Learn More </Button>
							</LinkContainer>

						</div>
					</div>
					<div class="card border-secondary bg-light">
						<div class="card-body d-flex flex-column">
							<h5 class="card-title" className='text-center'><b>Recipes</b></h5>
							<p class="card-text" className = 'text-center'> A new feature in the series, crafting has allowed
							players to take materials they have already acquired to craft into a completely new item. Fun fact: Did you know
							that some DIY recipes can only be given by certain villagers with a specific personality?</p>

							<LinkContainer to="/recipes">
								<Button variant="outline-secondary mt-auto" size="lg"> Learn More </Button>
							</LinkContainer>

						</div>
					</div>
					<div class="card border-success bg-light">
						<div class="card-body d-flex flex-column">
							<h5 class="card-title" className='text-center'> <b>Rugs</b> </h5>
							<p class="card-text" className = 'text-center'> Rugs are another way to decorate the interior
							of your house. Place one anywhere on the floor for a better way to decorate your house. 
							Think carefully though, as rugs cannot overlap with one another. </p>

							<LinkContainer to="/rugs">
								<Button variant="outline-success mt-auto" size="lg"> Learn More </Button>
							</LinkContainer>

						</div>
					</div>
					<div class="card border-danger bg-light">
						<div class="card-body d-flex flex-column">
							<h5 class="card-title" className='text-center'><b>Sea Creatures</b></h5>
							<p class="card-text" className = 'text-center'> Added in the Wave One of the Summer Update of 2020, you can
							go to Nook's Cranny and buy a swimsuit to swim in the ocean. A key element also included diving for
							sea creatures previously inaccessible via a fishing rod. You have to be quick, as these animals
							can swim away from you! </p>

							<LinkContainer to="/sea">
								<Button variant="outline-danger mt-auto" size="lg"> Learn More </Button>
							</LinkContainer>

						</div>
					</div>
				</div>
				<br/>
				<div class="card-deck">
					<div class="card border-warning bg-light">
						<div class="card-body d-flex flex-column">
							<h5 class="card-title" className='text-center'><b>Songs</b></h5>
							<p class="card-text" className = 'text-center'> After reaching three stars on your island, talk
							to Isabelle to invite K. K. Slider for a concert. Afterwards, he will visit your island every Saturday.
							By then, you can talk to the talented K. K. Slider and request for any song to listen to while the credits roll.</p>

							<LinkContainer to="/songs">
								<Button variant="outline-warning mt-auto" size="lg"> Learn More </Button>
							</LinkContainer>

						</div>
					</div>
					<div class="card border-info bg-light">
						<div class="card-body d-flex flex-column">
							<h5 class="card-title" className='text-center'> <b>Tools</b> </h5>
							<p class="card-text" className = 'text-center'> Tools are essential items in your inventory
							crucial to the development of your personal island. From nets to catch bugs to optional wands
							to change appearance, many tools are required to change your island or do daily tasks. </p>

							<LinkContainer to="/tools">
								<Button variant="outline-info mt-auto" size="lg"> Learn More </Button>
							</LinkContainer>

						</div>
					</div>
					<div class="card border-info bg-light">
						<div class="card-body d-flex flex-column">
							<h5 class="card-title" className='text-center'><b>Villagers</b></h5>
							<p class="card-text" className = 'text-center'> With around 400 villagers in the game, these NPCs can
							move onto your island to live in and is sure to brighten up your town. Talk to them, boost your friendship,
							and they may even give you a picture of themselves as a token of your bond.</p>

							<LinkContainer to="/villagers">
								<Button variant="outline-info mt-auto" size="lg"> Learn More </Button>
							</LinkContainer>

						</div>
					</div>	
					<div class="card border-dark bg-light">
						<div class="card-body d-flex flex-column">
							<h5 class="card-title" className='text-center'> <b>Wallpapers</b> </h5>
							<p class="card-text" className = 'text-center'> Sold mostly from Saharah, wallpapers are just one 
							of the few ways to decorate your house. Get rid of the boring white wall and put up more 
							interesting designs to your liking. Some wallpaper may even move! </p>

							<LinkContainer to="/wallpapers">
								<Button variant="outline-dark mt-auto" size="lg"> Learn More </Button>
							</LinkContainer>

						</div>
					</div>
				</div>
				<br/>
			</div>
			)
		}
		
		return(
			
			<div className="background-blue">
				<Helmet>
					<title>{ TITLE }</title>
				</Helmet>
				
				<div className="bg">
					<BrowserView>
						<div className="centered">
							<div style={{display: 'flex', justifyContent: 'center'}}>
								<img className="img-center" src="https://i.imgur.com/PvMcwbp.png" alt=""/>
							</div> 
							<div style={{display: 'flex', justifyContent: 'center'}}>
								<img className="img-center" src="https://i.imgur.com/DUKk72n.png" alt="Welcome to the Animal Crossing: New Horizons Database"/>
							</div> 
						</div>
					</BrowserView>
					<MobileView>
						<b><h1 className='text-center white-text'>Welcome to the Animal Crossing: New Horizons Database</h1></b>       
						<br/>
					</MobileView>
				</div>
				<br/>
				
				<BrowserView>
					<div className='realfrontpagepadding'>
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

export default FrontPage;