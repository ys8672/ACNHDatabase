import React from 'react'
import { Helmet } from 'react-helmet'
import {BrowserView, MobileView} from "react-device-detect";

class ArtDetails extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            art: {},
			canShow: true
        }
    }
	

	componentDidMount() {
		fetch(`/api${this.props.location.pathname}`).then(r => r.json()).then(art_by_ID => {
			this.setState({art: art_by_ID})
			if('code' in art_by_ID){
				this.setState({canShow: false});
			}
        })
	}
	
	render() {
		function booleanFormatter(bool) {
			var cell = Boolean(bool)
			if(cell === true){
				return ("Yes")
			}
			return ("No")
		}

		const title = "ACNH Database: Art Details"
		const art = this.state.art
		const canShow = this.state.canShow
		
		function card(){
			return(
			<div>
				{canShow && <div class="borderdiv">
					<div class="row no-gutters">
						<div class="col-md-4">
							<img src={art.image} class="card-img" alt=""
								 style={{maxHeight: '100%', maxWidth: '100%'}}/>
						</div>
						<div class="col-md-8">
							<div class="card-body">
								<h1 class="card-title capitalize"><b>Name: {art.name}</b></h1>
								<p class="card-text"><b>Has Fake Version?:</b> {booleanFormatter(art.hasFake)} </p>
								<p class="card-text"><b>Purchase Price: </b> {art.buyPrice} </p>
								<p class="card-text"><b>Sell Price:</b> {art.sellPrice} </p>
								<p class="card-text"><b>Museum Description:</b> {art.museum} </p>
							</div>
						</div>
					</div>
				</div>}
				{!canShow && <div class="borderdiv">
					<h5 className="text-center">Error Code: {art.code} </h5>
					<p className="text-center">{art.message} </p>
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

export default ArtDetails;