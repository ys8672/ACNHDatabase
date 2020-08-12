import React from "react";
import { Helmet } from 'react-helmet'

const TITLE = 'ACNH Database Search'

class Search extends React.Component {
	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
	 
	}
	
	searchData() {
		
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
			</div>
		</div>
		)
	}
}

export default Search;