import React from 'react';
import './index.css';

class FrontPage extends React.Component{	
	constructor(props) {
		super(props);
	}
	
	render(){
		return(
			<div style={{display: 'flex', justifyContent: 'center'}}>
				<a href="/villagers">Villagers</a>
			</div> 
		)
	}
}

export default FrontPage;