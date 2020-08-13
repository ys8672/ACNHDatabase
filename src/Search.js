import React from "react";
import { Helmet } from 'react-helmet'

const TITLE = 'ACNH Database Search'

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef()
		this.state = {
			searchText: '',
			searchTextArray: [],
			villagers: [],
			villagersFiltered: []
		}
		this.searchData = this.searchData.bind(this)
	}
	
	componentDidMount() {
		fetch('/api/villagers/').then(r => r.json()).then(villager_data => {
            this.setState({villagers: villager_data.villagers})
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
		let input = document.getElementById("searchBar").value;
        this.myRef.current = input
		this.setState({
            searchText: input
        });
		if (input === ""){
			this.setState({villagersFiltered: []})
		}
		else{
			var inputSplit = input.split(" ");
			this.setState({
				searchTextArray: inputSplit
			});
			//sort villagers
			var villagerList = this.sortFunc(inputSplit, this.state.villagers)
			this.setState({villagersFiltered: villagerList})

		}
	}
	
	render() {
		return(
		<div class="frontpagepadding">
			<Helmet>
			  <title>{ TITLE }</title>
			</Helmet>
			<div>
				<h1 className='text-center'><b>Search:</b></h1>
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
				<h3 className='text-center'><b>You searched: {this.myRef.current} </b></h3>
				<h5 className='text-center'>Number of results: {(this.state.villagersFiltered).length}</h5>
				<br/>
			</div>
			
			<div>
			{(this.state.villagersFiltered).map((villager, i) =>
				<div class="borderdiv" key={i}>
					<h1 className='text-center'><b>Villager: {villager.name}</b></h1>
					<p className="text-center"><b>Personality:</b> {villager.personality} &emsp; <b>Birthday:</b> {villager.birthday} &emsp;
					<b>Species:</b> {villager.species} &emsp; <b>Gender:</b> {villager.gender} &emsp; <b>Catch Phrase:</b> {villager.catchPhrase}
					&emsp; <a href={villager.image}><b>Image</b></a></p>
					<br/>
				</div>
			)}
			</div>
		</div>
		)
	}
}

export default Search;