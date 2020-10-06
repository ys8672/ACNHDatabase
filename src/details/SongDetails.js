import React from 'react'
import { Helmet } from 'react-helmet'
import {BrowserView, MobileView} from "react-device-detect";

class SongDetails extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            song: {},
			canShow: true
        }
    }
	
	componentDidMount() {
		fetch(`/api${this.props.location.pathname}`).then(r => r.json()).then(song_by_ID => {
			this.setState({song: song_by_ID})
			if('code' in song_by_ID){
				this.setState({canShow: false});
			}
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
		
		function card(){
			return(
				<div>
					{canShow && <div class="borderdiv">
						<div class="row no-gutters">
							<div class="col-md-4">
								<img src={song.image} class="card-img" alt=""
									 style={{maxHeight: '100%', maxWidth: '100%'}}/>
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h1 class="card-title"><b>Name: {song.name}</b></h1>
									<p class="card-text"><b>Orderable?: </b> {song.isOrderable} </p>
									<p class="card-text"><b>Purchase Price:</b> {priceFormatter(song.buyPrice)} </p>
									<p class="card-text"><b>Sell Price:</b> {song.sellPrice} </p>
									<audio src={song.music} controls>
										Your browser does not support the audio element.
									</audio>
								</div>
							</div>
						</div>
					</div>}
					{!canShow && <div class="borderdiv">
						<h5 className="text-center">Error Code: {song.code} </h5>
						<p className="text-center">{song.message} </p>
					</div>}
				</div>
			)
		}
		
		const title = "ACNH Database: Song Details"
		const song = this.state.song
		const canShow = this.state.canShow
		return(
			<div>
				<Helmet>
					<title>{title} </title>
				</Helmet>
				<br/>
				
				<BrowserView>
					<div class="frontpagepadding">
						{card()}
					</div>
				</BrowserView>
				
				<MobileView>
					{card()}
				</MobileView>
			</div>
		)
	}
}

export default SongDetails;