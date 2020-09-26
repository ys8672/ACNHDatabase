import React from 'react'
import { Helmet } from 'react-helmet'
import {BrowserView, MobileView} from "react-device-detect";

class RugDetails extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            rug: {},
			canShow: true
        }
    }
	

	componentDidMount() {
		fetch(`/api/${this.props.location.pathname}`).then(r => r.json()).then(rug_by_ID => {
			this.setState({rug: rug_by_ID})
			if('code' in rug_by_ID){
				this.setState({canShow: false});
			}
        })
	}
	


	render() {
		const title = "ACNH Database: Rug Details"
		const rug = this.state.rug
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
									<img src={rug.image} class="card-img" alt=""
										 style={{maxHeight: '100%', maxWidth: '100%'}}/>
								</div>
								<div class="col-md-8">
									<div class="card-body">
										<h1 class="card-title capitalize"><b>Name: {rug.name}</b></h1>
										<p class="card-text"><b>Purchase Price: </b> {buyFormatter(rug.buy)} </p>
										<p class="card-text"><b>Sell Price: </b> {rug.sell} </p>
										<p class="card-text"><b>Color(s): </b> {rug.color} </p>
										<p class="card-text"><b>Source: </b> {rug.source} </p>
										<p class="card-text"><b>Size: </b> {rug.size} </p>
										<p class="card-text"><b>Size Category: </b> {rug.sizeCategory} </p>
										<p class="card-text"><b>HHA Points: </b> {rug.points} </p>
										<p class="card-text"><b>HHA Series: </b> {rug.series} </p>
										<p class="card-text capitalize"><b>Themes: </b> {rug.concepts} </p>
										<p class="card-text"><b>Tag: </b> {rug.tag} </p>
									</div>
								</div>
							</div>
					</div>}
					{!canShow && <div class="borderdiv">
						<h5 className="text-center">Error Code: {rug.code} </h5>
						<p className="text-center">{rug.message} </p>
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

export default RugDetails;