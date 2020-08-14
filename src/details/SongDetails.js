import React from 'react'
import {Link} from "react-router-dom";
import { Helmet } from 'react-helmet'

class SongDetails extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            song: {}
        }
    }
	
	componentDidMount() {
		fetch(`/api/${this.props.location.pathname}`).then(r => r.json()).then(song_by_ID => {
			this.setState({song: song_by_ID})
        })
	}
	
	render() {
		function priceFormatter(price){
			var cost = parseInt(price)
			if(Number.isNaN(cost)){
				return ""
			}
			if (cost === -1){
				return "Not Purchsable"
			}
			else{
				return parseInt(price)
			}
		}
		
		const title = "ACNH Database: Song Details"
		const song = this.state.song
		return(
			<div class="frontpagepadding">
				<Helmet>
					<title>{title} </title>
				</Helmet>
				<br/>
				<div class="borderdiv">
					<div class="row no-gutters">
						<div class="col-md-4">
							<img src={song.image} class="card-img" alt=""
								 style={{maxHeight: '100%', maxWidth: '100%'}}/>
						</div>
						<div class="col-md-8">
							<div class="card-body">
								<h1 class="card-title"><b>Name: {song.name}</b></h1>
								<p class="card-text"><b>Purchasable?: </b> {song.isOrderable} </p>
								<p class="card-text"><b>Purchase Price:</b> {priceFormatter(song.buyPrice)} </p>
								<p class="card-text"><b>Sell Price:</b> {song.sellPrice} </p>
								<audio src={song.music} controls>
									Your browser does not support the audio element.
								</audio>
							</div>
						</div>
					</div>
				</div>
				<br/>
				<div class="text-center">
					<Link to={{pathname:`/`}}>Return to home page</Link>
				</div>
			</div>
		)
	}
}

export default SongDetails;