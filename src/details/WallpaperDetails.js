import React from 'react'
import { Helmet } from 'react-helmet'
import {BrowserView, MobileView} from "react-device-detect";

class WallpaperDetails extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            wallpaper: {},
			canShow: true
        }
    }
	

	componentDidMount() {
		fetch(`/api/${this.props.location.pathname}`).then(r => r.json()).then(wallpaper_by_ID => {
			this.setState({wallpaper: wallpaper_by_ID})
			if('code' in wallpaper_by_ID){
				this.setState({canShow: false});
			}
        })
	}
	


	render() {
		const title = "ACNH Database: Wallpaper Details"
		const wallpaper = this.state.wallpaper
		const canShow = this.state.canShow
		
		function buyFormatter(cell, row) {
			if(cell === -1){
				return "Not Purchasable"
			}
			return parseInt(cell)
		}
		
		function card(canShow){
			return(
				<div>
					{canShow && <div class="borderdiv">
							<div class="row no-gutters">
								<div class="col-md-4">
									<img src={wallpaper.image} class="card-img" alt=""
										 style={{maxHeight: '100%', maxWidth: '100%'}}/>
								</div>
								<div class="col-md-8">
									<div class="card-body">
										<h1 class="card-title capitalize"><b>Name: {wallpaper.name}</b></h1>
										<p class="card-text"><b>Visual Effects Type: </b> {wallpaper.vfxType} </p>
										<p class="card-text"><b>Purchase Price: </b> {buyFormatter(wallpaper.buy)} </p>
										<p class="card-text"><b>Sell Price: </b> {wallpaper.sell} </p>
										<p class="card-text"><b>Color(s): </b> {wallpaper.color} </p>
										<p class="card-text"><b>Source: </b> {wallpaper.source} </p>
										<p class="card-text"><b>Window Type: </b> {wallpaper.windowType} </p>
										<p class="card-text"><b>Ceiling Type: </b> {wallpaper.ceilingType} </p>
										<p class="card-text"><b>Curtain Type: </b> {wallpaper.curtainType} </p>
										<p class="card-text"><b>HHA Points: </b> {wallpaper.points} </p>
										<p class="card-text"><b>HHA Series: </b> {wallpaper.series} </p>
										<p class="card-text capitalize"><b>Themes: </b> {wallpaper.concepts} </p>
										<p class="card-text"><b>Tag: </b> {wallpaper.tag} </p>
									</div>
								</div>
							</div>
					</div>}
					{!canShow && <div class="borderdiv">
						<h5 className="text-center">Error Code: {wallpaper.code} </h5>
						<p className="text-center">{wallpaper.message} </p>
					</div>}
				</div>
			)
		}
		
		return(
			<div>
				<Helmet>
					<title>{title} </title>
				</Helmet>
				<br/>
				<BrowserView>
					<div class="frontpagepadding">
						{card(canShow)}
					</div>
				</BrowserView>
				
				<MobileView>
					{card(canShow)}
				</MobileView>
			</div>
		)
	}
}

export default WallpaperDetails;