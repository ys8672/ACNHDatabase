import React from "react";
import { Helmet } from 'react-helmet'
import {Link} from 'react-router-dom';
import Highlighter from "react-highlight-words"
import {BrowserView, MobileView, isBrowser, isMobile} from "react-device-detect";

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
			reactions: [],
			reactionsFiltered: [],
			items: [],
			itemsFiltered: [],
			fossils: [],
			fossilsFiltered: [],
			fish: [],
			fishFiltered: [],
			construction: [],
			constructionFiltered: [],
			clothes: [],
			clothesFiltered: [],
			bugs: [],
			bugsFiltered: [],
			art: [],
			artFiltered: []
		}
		this.searchData = this.searchData.bind(this)
		this.scrollDivArt = React.createRef();
		this.scrollDivBugs = React.createRef();
		this.scrollDivClothes = React.createRef();
		this.scrollDivConstruction = React.createRef();
		this.scrollDivFish = React.createRef();
		this.scrollDivFossils = React.createRef();
		this.scrollDivItems = React.createRef();
		this.scrollDivReactions = React.createRef();
		this.scrollDivRecipes = React.createRef();
		this.scrollDivSea = React.createRef();
		this.scrollDivSongs = React.createRef();
		this.scrollDivVillagers = React.createRef();
	}
	
	componentDidMount() {
		fetch('/api/search/').then(r => r.json()).then(search_data => {
            let search = search_data.search
			let art2 = []
			let bugs2 = []
			let clothes2 = []
			let construction2 = []
			let fish2 = []
			let fossils2 = []
			let items2 = []
			let reactions2 = []
			let recipes2 = []
			let sea2 = []
			let songs2 = []
			let villagers2 = []
			var i;
			for (i = 0; i < search.length; i++) {
				var cat = search[i].category;
				switch(true){					
					case (cat === 'art'):
						art2.push(search[i]);
						break;
					case (cat === 'bugs'):
						bugs2.push(search[i]);
						break;
					case (cat === 'clothes'):
						clothes2.push(search[i]);
						break;
					case (cat === 'construction'):
						construction2.push(search[i]);
						break;
					case (cat === 'fish'):
						fish2.push(search[i]);
						break;
					case (cat === 'fossils'):
						fossils2.push(search[i]);
						break;
					case (cat === 'items'):
						items2.push(search[i]);
						break;
					case (cat === 'reactions'):
						reactions2.push(search[i]);
						break;
					case (cat === 'recipes'):
						recipes2.push(search[i]);
						break;
					case (cat === 'sea'):
						sea2.push(search[i]);
						break;
					case (cat === 'songs'):
						songs2.push(search[i]);
						break;
					case (cat=== 'villagers'):
						villagers2.push(search[i]);
						break;
					default:
						break;
				}
			} 
			this.setState({art: art2})
			this.setState({bugs: bugs2})
			this.setState({clothes: clothes2})
			this.setState({construction: construction2})
			this.setState({fish: fish2})
			this.setState({fossils: fossils2})
			this.setState({items: items2})
			this.setState({reactions: reactions2})
			this.setState({recipes: recipes2})
			this.setState({sea: sea2})
			this.setState({songs: songs2})
			this.setState({villagers: villagers2})
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
		//Needed otherwise searching empty and then another will not clear the filtered list.
		if (input === ""){
			this.setState({canShow: false})
			this.setState({villagersFiltered: []})
			this.setState({songsFiltered: []})
			this.setState({seaFiltered: []})
			this.setState({recipesFiltered: []})
			this.setState({reactionsFiltered: []})
			this.setState({itemsFiltered: []})
			this.setState({fossilsFiltered: []})
			this.setState({fishFiltered: []})
			this.setState({constructionFiltered: []})
			this.setState({clothesFiltered: []})
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
			//Reactions
			var reactionList = this.sortFunc(inputSplit, this.state.reactions)
			this.setState({reactionsFiltered: reactionList})
			//Items
			var itemList = this.sortFunc(inputSplit, this.state.items)
			this.setState({itemsFiltered: itemList})
			//Fossils
			var fossilList = this.sortFunc(inputSplit, this.state.fossils)
			this.setState({fossilsFiltered: fossilList})
			//fish
			var fishList = this.sortFunc(inputSplit, this.state.fish)
			this.setState({fishFiltered: fishList})
			//clothes
			var clothList = this.sortFunc(inputSplit, this.state.clothes)
			this.setState({clothesFiltered: clothList})
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
					<h1 className='text-center'><b>Search</b></h1>
					<BrowserView>
						<br/>
						<div style={{display: 'flex', justifyContent: 'center'}}>
							<img className="img" src="https://i.imgur.com/LjX6ohC.png" alt=""/>
						</div>
					</BrowserView>
					<br/>
					<div class="aboutcard" style={{display: 'flex', justifyContent: 'center'}}>
						<input class="form-control form-control-lg" type="text" id="searchBar"
							   placeholder="Search:"></input>
						<button type="submit" class="btn btn-primary btn-lg" onClick={this.searchData}>Search
						</button>
					</div>
					<br/>				
				</div>
				<br/>
				{this.state.canShow && <div>
					<BrowserView>
						<div style={{display: 'flex', justifyContent: 'center'}}>
							<div class="btn-group" role="group" aria-label="Basic example">
								<button type="button" class="btn btn-secondary" onClick={() => {
										this.scrollDivArt.current.scrollIntoView({ behavior: 'smooth' });
									  }}>Art</button>
								<button type="button" class="btn btn-secondary" onClick={() => {
										this.scrollDivBugs.current.scrollIntoView({ behavior: 'smooth' });
									  }}>Bugs</button>
								<button type="button" class="btn btn-secondary" onClick={() => {
										this.scrollDivClothes.current.scrollIntoView({ behavior: 'smooth' });
									  }}>Clothes</button>
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
										this.scrollDivReactions.current.scrollIntoView({ behavior: 'smooth' });
									  }}>Reactions</button>
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
					</BrowserView>
					<br/>
					
					<h1 className='text-center'><b>You searched: {this.myRef.current} </b></h1>
					<h5 className='text-center'>Total Number of results: {(this.state.seaFiltered).length + (this.state.villagersFiltered).length
						+ (this.state.songsFiltered).length + (this.state.recipesFiltered).length + (this.state.itemsFiltered).length
						+ (this.state.fossilsFiltered).length + (this.state.fishFiltered).length + (this.state.constructionFiltered).length
						+ (this.state.bugsFiltered).length + (this.state.artFiltered).length + (this.state.reactionsFiltered).length
						+ (this.state.clothesFiltered).length}</h5>
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
									<div style={{display: 'flex', justifyContent: 'center'}}>
										<Link to={{pathname: `/art/${art.id}/`}}>More details</Link>
									</div>
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
									<div style={{display: 'flex', justifyContent: 'center'}}>
										<Link to={{pathname: `/bugs/${bug.id}/`}}>More details</Link>
									</div>
								</div>
							)}  
					</div>
					<br/>
					
					<div ref={this.scrollDivClothes}>
						<h3 className='text-center'><b>Clothes: </b></h3>
						<h5 className='text-center'>Number of clothes: {(this.state.clothesFiltered).length}</h5>
							{(this.state.clothesFiltered).map((cloth, i) =>
								<div class="borderdiv" key={i}>
									<h5 className='text-center capitalize'><b>
										<Highlighter
											highlightClassName="YourHighlightClass"
											searchWords={this.state.searchTextArray}
											autoEscape={true}
											textToHighlight={cloth.name}
										/>
									</b></h5>
									<div style={{display: 'flex', justifyContent: 'center'}}>
										<Link to={{pathname: `/clothes/${cloth.id}/`}}>More details</Link>
									</div>
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
									<div style={{display: 'flex', justifyContent: 'center'}}>
										<Link to={{pathname: `/construction/${cons.id}/`}}>More details</Link>
									</div>
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
									<div style={{display: 'flex', justifyContent: 'center'}}>
										<Link to={{pathname: `/fish/${fish.id}/`}}>More details</Link>
									</div>
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
									<div style={{display: 'flex', justifyContent: 'center'}}>
										<Link to={{pathname: `/fossils/${fossil.id}/`}}>More details</Link>
									</div>
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
									<div style={{display: 'flex', justifyContent: 'center'}}>
										<Link to={{pathname: `/items/${item.id}/`}}>More details</Link>
									</div>
								</div>
							)}  
					</div>
					<br/>
					
					<div ref={this.scrollDivReactions}>
						<h3 className='text-center'><b>Reactions: </b></h3>
						<h5 className='text-center'>Number of reactions: {(this.state.reactionsFiltered).length}</h5>
							{(this.state.reactionsFiltered).map((reaction, i) =>
								<div class="borderdiv" key={i}>
									<h5 className='text-center capitalize'><b>
										<Highlighter
											highlightClassName="YourHighlightClass"
											searchWords={this.state.searchTextArray}
											autoEscape={true}
											textToHighlight={reaction.name}
										/>
									</b></h5>
									<div style={{display: 'flex', justifyContent: 'center'}}>
										<Link to={{pathname: `/reactions/${reaction.id}/`}}>More details</Link>
									</div>
								</div>
							)}  
					</div>
					
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
									<div style={{display: 'flex', justifyContent: 'center'}}>
										<Link to={{pathname: `/recipes/${recipe.id}/`}}>More details</Link>
									</div>
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
									<div style={{display: 'flex', justifyContent: 'center'}}>
										<Link to={{pathname: `/sea/${sea.id}/`}}>More details</Link>
									</div> 
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
									<div style={{display: 'flex', justifyContent: 'center'}}>
										<Link to={{pathname: `/songs/${song.id}/`}}>More details</Link>
									</div> 
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
									<div style={{display: 'flex', justifyContent: 'center'}}>
										<Link to={{pathname: `/villagers/${villager.id}/`}}>More details</Link>
									</div> 
								</div>
							)}
					</div>
					<br/>
				</div>}
			</div>
		)
	}
}

export default Search;