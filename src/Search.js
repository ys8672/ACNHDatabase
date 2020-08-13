import React from "react";
import { Helmet } from 'react-helmet'

const TITLE = 'ACNH Database Search'

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
			itemsFiltered: []
		}
		this.searchData = this.searchData.bind(this)
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
	}
	
	sortFunc(inputSplit, category){
		let list = []
		for (let c of category) {
			var i;
			var x = true;
			for (i = 0; i < inputSplit.length; i++) {
				if (!((c.name.toLowerCase()).indexOf(inputSplit[i].toLowerCase()) >= 0)) {
					x = false;
					break;
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
				<br/>
				<div style={{display: 'flex', justifyContent: 'center'}}>
                        <img className="img-center"
                             src={process.env.PUBLIC_URL + '/search.png'}
                             alt="not found"/>
                    </div>
				
				<br/>
				<div class="aboutcard" style={{display: 'flex', justifyContent: 'center'}}>
					<input class="form-control form-control-lg" type="text" id="searchBar"
						   placeholder="Search anything:"></input>
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
					+ (this.state.songsFiltered).length + (this.state.recipesFiltered).length + (this.state.itemsFiltered).length}</h5>
				<br/>
				
				<div ref={this.scrollDivItems}>
					<h3 className='text-center'><b>Items: </b></h3>
					<h5 className='text-center'>Number of items: {(this.state.itemsFiltered).length}</h5>
						{(this.state.itemsFiltered).map((item, i) =>
							<div class="borderdiv" key={i}>
								<h5 className='text-center capitalize'><b>{item.name}</b></h5>
								<p className='text-center'><a href={item.image} target="_blank"><b>Image</b></a></p>
							</div>
						)}  
				</div>
				<br/>
				
				<div ref={this.scrollDivRecipes}>
					<h3 className='text-center'><b>Recipes: </b></h3>
					<h5 className='text-center'>Number of recipes: {(this.state.recipesFiltered).length}</h5>
						{(this.state.recipesFiltered).map((recipe, i) =>
							<div class="borderdiv" key={i}>
								<h5 className='text-center capitalize'><b>{recipe.name}</b></h5>
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
								<h5 className='text-center capitalize'><b>{sea.name}</b></h5>
								<p className='text-center'><a href={sea.image} target="_blank"><b>Image</b></a></p>
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
								<h5 className='text-center'><b>{song.name}</b></h5>
								<p className='text-center'><a href={song.image} target="_blank"><b>Image</b></a> &emsp; <a href={song.music} target="_blank"><b>Music</b></a></p>
							</div>
						)}  
				</div>
				<br/>
				
				<div ref={this.scrollDivVillagers}>
					<h3 className='text-center'><b>Villagers:</b></h3>
					<h5 className='text-center'>Number of villagers: {(this.state.villagersFiltered).length}</h5>
						{(this.state.villagersFiltered).map((villager, i) =>
							<div class="borderdiv" key={i}>
								<h5 className='text-center'><b>{villager.name}</b></h5>
								<p className='text-center'><a href={villager.image} target="_blank"><b>Image</b></a></p>
							</div>
						)}
				</div>
			</div>}
		</div>
		)
	}
}

export default Search;