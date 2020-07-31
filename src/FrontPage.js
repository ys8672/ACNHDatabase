import React from 'react';
import './index.css';

class FrontPage extends React.Component{	
	render(){
		return(
			<div>
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<a href="/villagers">Villagers</a>
				</div> 
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<a href="/songs">Songs</a>
				</div> 
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<a href="/sea">Sea Creatures</a>
				</div> 
			</div>
		)
	}
}

export default FrontPage;