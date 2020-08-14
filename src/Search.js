import React from "react";
import { Helmet } from 'react-helmet'
import Highlighter from "react-highlight-words"

const TITLE = 'ACNH Image Search'

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef()
		this.state = {
			canShow: false,
			searchText: '',
			searchTextArray: [],
			villagers: [],
			villagersFiltered: [],
			songs: [],
			songsFiltered: [],
			sea: [],
			seaFiltered:[],
			recipes: [],
			recipesFiltered: [],
			items: [],
			itemsFiltered: [],
			fossils: [],
			fossilsFiltered: [],
			fish: [],
			fishFiltered: [],
			construction: [],
			constructionFiltered: [],
			bugs: [],
			bugsFiltered: [],
			art: [],
			artFiltered: []
		}
		this.searchData = this.searchData.bind(this)
		this.scrollDivArt = React.createRef();
		this.scrollDivBugs = React.createRef();
		this.scrollDivConstruction = React.createRef();
		this.scrollDivFish = React.createRef();
		this.scrollDivFossils = React.createRef();
		this.scrollDivItems = React.createRef();
		this.scrollDivRecipes = React.createRef();
		this.scrollDivSea = React.createRef();
		this.scrollDivSongs = React.createRef();
		this.scrollDivVillagers = React.createRef();
	}
	
	componentDidMount() {
		fetch('/api/villagers/').then(r => r.json()).then(villager_data => {
            this.setState({villagers: villager_data.villagers})
        })
		fetch('/api/songs/').then(r => r.json()).then(song_data => {
            this.setState({songs: song_data.songs})
        })
		fetch('/api/sea/').then(r => r.json()).then(sea_data => {
            this.setState({sea: sea_data.sea})
        })
		fetch('/api/recipes/').then(r => r.json()).then(recipe_data => {
            this.setState({recipes: recipe_data.recipes})
        })
		fetch('/api/items/').then(r => r.json()).then(item_data => {
            this.setState({items: item_data.items})
        })
		fetch('/api/fossils/').then(r => r.json()).then(fossil_data => {
            this.setState({fossils: fossil_data.fossils})
        })
		fetch('/api/fish/').then(r => r.json()).then(fish_data => {
            this.setState({fish: fish_data.fish})
        })
		fetch('/api/construction/').then(r => r.json()).then(construction_data => {
            this.setState({construction: construction_data.construction})
        })
		fetch('/api/bugs/').then(r => r.json()).then(bug_data => {
            this.setState({bugs: bug_data.bugs})
        })
		fetch('/api/art/').then(r => r.json()).then(art_data => {
            this.setState({art: art_data.arts})
        })
	}
	
	sortFunc(inputSplit, category){
		let list = []
		for (let c of category) {
			var i;
			var x = true;
			var str = c.name.toLowerCase()
			for (i = 0; i < inputSplit.length; i++) {
				var inputStr = inputSplit[i].toLowerCase()
				if (!(str.indexOf(inputStr) >= 0)) {
					x = false;
					break;
				}
				else{
					str = str.replace(inputStr ,"");
				}
			} 
			if (x === true){
				list.push(c)	
			}
		}
		return list
	}
	
	searchData() {
		this.setState({canShow: 1})
		let input = document.getElementById("searchBar").value;
        this.myRef.current = input
		this.setState({
            searchText: input
        });
		if (input === ""){
			this.setState({canShow: false})
			this.setState({villagersFiltered: []})
			this.setState({songsFiltered: []})
			this.setState({seaFiltered: []})
			this.setState({recipesFiltered: []})
			this.setState({itemsFiltered: []})
			this.setState({fossilsFiltered: []})
			this.setState({fishFiltered: []})
			this.setState({constructionFiltered: []})
			this.setState({bugsFiltered: []})
			this.setState({artFiltered: []})
		}
		else{
			var inputSplit = input.split(" ");
			this.setState({
				searchTextArray: inputSplit
			});
			//sort villagers
			var villagerList = this.sortFunc(inputSplit, this.state.villagers)
			this.setState({villagersFiltered: villagerList})
			//sort songs
			var songList = this.sortFunc(inputSplit, this.state.songs)
			this.setState({songsFiltered: songList})
			//sea
			var seaList = this.sortFunc(inputSplit, this.state.sea)
			this.setState({seaFiltered: seaList})
			//DIY recipes
			var recipeList = this.sortFunc(inputSplit, this.state.recipes)
			this.setState({recipesFiltered: recipeList})
			//Items
			var itemList = this.sortFunc(inputSplit, this.state.items)
			this.setState({itemsFiltered: itemList})
			//Fossils
			var fossilList = this.sortFunc(inputSplit, this.state.fossils)
			this.setState({fossilsFiltered: fossilList})
			//fish
			var fishList = this.sortFunc(inputSplit, this.state.fish)
			this.setState({fishFiltered: fishList})
			//construction
			var constructionList = this.sortFunc(inputSplit, this.state.construction)
			this.setState({constructionFiltered: constructionList})
			//bugs
			var bugList = this.sortFunc(inputSplit, this.state.bugs)
			this.setState({bugsFiltered: bugList})
			//art
			var artList = this.sortFunc(inputSplit, this.state.art)
			this.setState({artFiltered: artList})
		}
	}
	
	render() {
		return(
			<div class="frontpagepadding">
				<Helmet>
				  <title>{ TITLE }</title>
				</Helmet>
				<div>
					<h1 className='text-center'><b>Image Search</b></h1>
					<br/>
					<div style={{display: 'flex', justifyContent: 'center'}}>
							<img className="img-center"
								 src={process.env.PUBLIC_URL + '/search.png'}
								 alt="not found"/>
						</div>
					
					<br/>
					<div class="aboutcard" style={{display: 'flex', justifyContent: 'center'}}>
						<input class="form-control form-control-lg" type="text" id="searchBar"
							   placeholder="Search anything: (Note: DIY Recipes Do Not Have Images)"></input>
						<button type="submit" class="btn btn-primary btn-lg" onClick={this.searchData}>Search
						</button>
					</div>
					<br/>				
				</div>
				<br/>
				{this.state.canShow && <div>
					<div style={{display: 'flex', justifyContent: 'center'}}>
						<div class="btn-group" role="group" aria-label="Basic example">
							<button type="button" class="btn btn-secondary" onClick={() => {
									this.scrollDivArt.current.scrollIntoView({ behavior: 'smooth' });
								  }}>Art</button>
							<button type="button" class="btn btn-secondary" onClick={() => {
									this.scrollDivBugs.current.scrollIntoView({ behavior: 'smooth' });
								  }}>Bugs</button>
							<button type="button" class="btn btn-secondary" onClick={() => {
									this.scrollDivConstruction.current.scrollIntoView({ behavior: 'smooth' });
								  }}>Construction</button>
							<button type="button" class="btn btn-secondary" onClick={() => {
									this.scrollDivFish.current.scrollIntoView({ behavior: 'smooth' });
								  }}>Fish</button>
							<button type="button" class="btn btn-secondary" onClick={() => {
									this.scrollDivFossils.current.scrollIntoView({ behavior: 'smooth' });
								  }}>Fossils</button>
							<button type="button" class="btn btn-secondary" onClick={() => {
									this.scrollDivItems.current.scrollIntoView({ behavior: 'smooth' });
								  }}>Items</button>
							<button type="button" class="btn btn-secondary" onClick={() => {
									this.scrollDivRecipes.current.scrollIntoView({ behavior: 'smooth' });
								  }}>Recipes</button>
							<button type="button" class="btn btn-secondary" onClick={() => {
									this.scrollDivSea.current.scrollIntoView({ behavior: 'smooth' });
								  }}>Sea Creatures</button>
							<button type="button" class="btn btn-secondary" onClick={() => {
									this.scrollDivSongs.current.scrollIntoView({ behavior: 'smooth' });
								  }}>Songs</button>
							<button type="button" class="btn btn-secondary" onClick={() => {
									this.scrollDivVillagers.current.scrollIntoView({ behavior: 'smooth' });
								  }}>Villagers</button>
						</div>
					</div>
					<br/>
					
					<h1 className='text-center'><b>You searched: {this.myRef.current} </b></h1>
					<h5 className='text-center'>Total Number of results: {(this.state.seaFiltered).length + (this.state.villagersFiltered).length
						+ (this.state.songsFiltered).length + (this.state.recipesFiltered).length + (this.state.itemsFiltered).length
						+ (this.state.fossilsFiltered).length + (this.state.fishFiltered).length + (this.state.constructionFiltered).length
						+ (this.state.bugsFiltered).length + (this.state.artFiltered).length}</h5>
					<br/>

					<div ref={this.scrollDivArt}>
						<h3 className='text-center'><b>Art: </b></h3>
						<h5 className='text-center'>Number of art: {(this.state.artFiltered).length}</h5>
							{(this.state.artFiltered).map((art, i) =>
								<div class="borderdiv" key={i}>
									<h5 className='text-center capitalize'><b>
										<Highlighter
											highlightClassName="YourHighlightClass"
											searchWords={this.state.searchTextArray}
											autoEscape={true}
											textToHighlight={art.name}
										/>
									</b></h5>
									<p className='text-center'><a href={art.image} target="_blank" rel="noopener noreferrer" ><b>Image</b></a></p>
									<p className='text-center'>{art.museumPhrase} </p>
								</div>
							)}  
					</div>
					<br/>
					
					<div ref={this.scrollDivBugs}>
						<h3 className='text-center'><b>Bugs: </b></h3>
						<h5 className='text-center'>Number of bugs: {(this.state.bugsFiltered).length}</h5>
							{(this.state.bugsFiltered).map((bug, i) =>
								<div class="borderdiv" key={i}>
									<h5 className='text-center capitalize'><b>
										<Highlighter
											highlightClassName="YourHighlightClass"
											searchWords={this.state.searchTextArray}
											autoEscape={true}
											textToHighlight={bug.name}
										/>
									</b></h5>
									<p className='text-center'><a href={bug.image} target="_blank" rel="noopener noreferrer" ><b>Image</b></a></p>
									<p className='text-center'>{bug.museumPhrase} </p>
								</div>
							)}  
					</div>
					<br/>
					
					<div ref={this.scrollDivConstruction}>
						<h3 className='text-center'><b>Construction: </b></h3>
						<h5 className='text-center'>Number of construction: {(this.state.constructionFiltered).length}</h5>
							{(this.state.constructionFiltered).map((cons, i) =>
								<div class="borderdiv" key={i}>
									<h5 className='text-center capitalize'><b>
										<Highlighter
											highlightClassName="YourHighlightClass"
											searchWords={this.state.searchTextArray}
											autoEscape={true}
											textToHighlight={cons.name}
										/>
									</b></h5>
									<p className='text-center'><a href={cons.image} target="_blank" rel="noopener noreferrer" ><b>Image</b></a></p>
								</div>
							)}  
					</div>
					<br/>
					
					<div ref={this.scrollDivFish}>
						<h3 className='text-center'><b>Fish: </b></h3>
						<h5 className='text-center'>Number of fish: {(this.state.fishFiltered).length}</h5>
							{(this.state.fishFiltered).map((fish, i) =>
								<div class="borderdiv" key={i}>
									<h5 className='text-center capitalize'><b>
										<Highlighter
											highlightClassName="YourHighlightClass"
											searchWords={this.state.searchTextArray}
											autoEscape={true}
											textToHighlight={fish.name}
										/>
									</b></h5>
									<p className='text-center'><a href={fish.image} target="_blank" rel="noopener noreferrer" ><b>Image</b></a></p>
									<p className='text-center'>{fish.museumPhrase} </p>
								</div>
							)}  
					</div>
					<br/>
					
					<div ref={this.scrollDivFossils}>
						<h3 className='text-center'><b>Fossils: </b></h3>
						<h5 className='text-center'>Number of fossils: {(this.state.fossilsFiltered).length}</h5>
							{(this.state.fossilsFiltered).map((fossil, i) =>
								<div class="borderdiv" key={i}>
									<h5 className='text-center capitalize'><b>
										<Highlighter
											highlightClassName="YourHighlightClass"
											searchWords={this.state.searchTextArray}
											autoEscape={true}
											textToHighlight={fossil.name}
										/>
									</b></h5>
									<p className='text-center'><a href={fossil.image} target="_blank" rel="noopener noreferrer" ><b>Image</b></a></p>
									<p className='text-center'>{fossil.museumPhrase} </p>
								</div>
							)}  
					</div>
					<br/>
					
					<div ref={this.scrollDivItems}>
						<h3 className='text-center'><b>Items: </b></h3>
						<h5 className='text-center'>Number of items: {(this.state.itemsFiltered).length}</h5>
							{(this.state.itemsFiltered).map((item, i) =>
								<div class="borderdiv" key={i}>
									<h5 className='text-center capitalize'><b>
										<Highlighter
											highlightClassName="YourHighlightClass"
											searchWords={this.state.searchTextArray}
											autoEscape={true}
											textToHighlight={item.name}
										/>
									</b></h5>
									<p className='text-center'><a href={item.image} target="_blank" rel="noopener noreferrer" ><b>Image</b></a></p>
								</div>
							)}  
					</div>
					<br/>
					
					<div ref={this.scrollDivRecipes}>
						<h3 className='text-center'><b>Recipes: </b></h3>
						<h5 className='text-center'>Number of recipes: {(this.state.recipesFiltered).length}</h5>
							{(this.state.recipesFiltered).map((recipe, i) =>
								<div class="borderdiv" key={i}>
									<h5 className='text-center capitalize'><b>
										<Highlighter
											highlightClassName="YourHighlightClass"
											searchWords={this.state.searchTextArray}
											autoEscape={true}
											textToHighlight={recipe.name}
										/>
									</b></h5>
									<p className='text-center'>Source: {recipe.source} </p>
									<p className='text-center'>Materials: {recipe.materials} </p>
								</div>
							)}  
					</div>
					<br/>
					
					<div ref={this.scrollDivSea}>
						<h3 className='text-center'><b>Sea Creatures:</b></h3>
						<h5 className='text-center'>Number of sea creatures: {(this.state.seaFiltered).length}</h5>
							{(this.state.seaFiltered).map((sea, i) =>
								<div class="borderdiv" key={i}>
									<h5 className='text-center capitalize'><b>
										<Highlighter
											highlightClassName="YourHighlightClass"
											searchWords={this.state.searchTextArray}
											autoEscape={true}
											textToHighlight={sea.name}
										/>
									</b></h5>
									<p className='text-center'><a href={sea.image} target="_blank" rel="noopener noreferrer" ><b>Image</b></a></p>
									<p className='text-center'>{sea.museumPhrase} </p>
								</div>
							)}  
					</div>
					<br/>
					
					<div ref={this.scrollDivSongs}>
						<h3 className='text-center'><b>Songs:</b></h3>
						<h5 className='text-center'>Number of songs: {(this.state.songsFiltered).length}</h5>
							{(this.state.songsFiltered).map((song, i) =>
								<div class="borderdiv" key={i}>
									<h5 className='text-center'><b>
										<Highlighter
											highlightClassName="YourHighlightClass"
											searchWords={this.state.searchTextArray}
											autoEscape={true}
											textToHighlight={song.name}
										/>
									</b></h5>
									<p className='text-center'><a href={song.image} target="_blank" rel="noopener noreferrer" ><b>Image</b></a> &emsp; <a href={song.music} target="_blank"><b>Music</b></a></p>
								</div>
							)}  
					</div>
					<br/>
					
					<div ref={this.scrollDivVillagers}>
						<h3 className='text-center'><b>Villagers:</b></h3>
						<h5 className='text-center'>Number of villagers: {(this.state.villagersFiltered).length}</h5>
							{(this.state.villagersFiltered).map((villager, i) =>
								<div class="borderdiv" key={i}>
									<h5 className='text-center'><b>
										<Highlighter
											highlightClassName="YourHighlightClass"
											searchWords={this.state.searchTextArray}
											autoEscape={true}
											textToHighlight={villager.name}
										/>
									</b></h5>
									<p className='text-center'><a href={villager.image} target="_blank" rel="noopener noreferrer" ><b>Image</b></a></p>
								</div>
							)}
					</div>
				</div>}
			</div>
		)
	}
}

export default Search;