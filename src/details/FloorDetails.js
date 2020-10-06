import React from 'react'
import { Helmet } from 'react-helmet'
import {BrowserView, MobileView} from "react-device-detect";

class FloorDetails extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            floor: {},
			canShow: true
        }
    }
	

	componentDidMount() {
		fetch(`/api${this.props.location.pathname}`).then(r => r.json()).then(floor_by_ID => {
			this.setState({floor: floor_by_ID})
			if('code' in floor_by_ID){
				this.setState({canShow: false});
			}
        })
	}
	


	render() {
		const title = "ACNH Database: Floor Details"
		const floor = this.state.floor
		const canShow = this.state.canShow
		
		function buyFormatter(cell, row) {
			if(cell === -1){
				return "Not Purchasable"
			}
			return parseInt(cell)
		}
		
		function booleanFormatter(cell, row){
			if(cell === true){
				return "Yes";
			}
			return "No";
		}
		
		function card(canShow){
			return(
				<div>
					{canShow && <div class="borderdiv">
							<div class="row no-gutters">
								<div class="col-md-4">
									<img src={floor.image} class="card-img" alt=""
										 style={{maxHeight: '100%', maxWidth: '100%'}}/>
								</div>
								<div class="col-md-8">
									<div class="card-body">
										<h1 class="card-title capitalize"><b>Name: {floor.name}</b></h1>
										<p class="card-text"><b>Visual Effects: </b> {booleanFormatter(floor.vfx)} </p>
										<p class="card-text"><b>Purchase Price: </b> {buyFormatter(floor.buy)} </p>
										<p class="card-text"><b>Sell Price: </b> {floor.sell} </p>
										<p class="card-text"><b>Color(s): </b> {floor.color} </p>
										<p class="card-text"><b>Source: </b> {floor.source} </p>
										<p class="card-text"><b>HHA Points: </b> {floor.points} </p>
										<p class="card-text"><b>HHA Series: </b> {floor.series} </p>
										<p class="card-text capitalize"><b>Themes: </b> {floor.concepts} </p>
										<p class="card-text"><b>Tag: </b> {floor.tag} </p>
									</div>
								</div>
							</div>
					</div>}
					{!canShow && <div class="borderdiv">
						<h5 className="text-center">Error Code: {floor.code} </h5>
						<p className="text-center">{floor.message} </p>
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

export default FloorDetails;