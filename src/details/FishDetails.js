import React from 'react'
import { Helmet } from 'react-helmet'
import {BrowserView, MobileView, isBrowser, isMobile} from "react-device-detect";

class FishDetails extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            fish: {},
			canShow: true
        }
    }
	
	componentDidMount() {
		fetch(`/api/${this.props.location.pathname}`).then(r => r.json()).then(fish_by_ID => {
			this.setState({fish: fish_by_ID})
			if('code' in fish_by_ID){
				this.setState({canShow: false});
			}
        })
	}
	
	render() {
		function switchMonth(month){
			switch(month){
				case 1:
					month = "January";
					break;
				case 2:
					month = "February";
					break;
				case 3:
					month = "March";
					break;
				case 4:
					month = "April";
					break;
				case 5:
					month = "May";
					break;
				case 6:
					month = "June";
					break;
				case 7:
					month = "July";
					break;
				case 8:
					month = "August";
					break;
				case 9:
					month = "September";
					break;
				case 10:
					month = "October";
					break;
				case 11:
					month = "November";
					break;
				case 12:
					month = "December";
					break;
				default:
					break;
			}
			return month;
		}
		
		function monthFormatter(str){
			var cell = String(str);
			if (cell === "All Year"){
				return "All Year"
			}
			else if (cell.includes("&")){
				var field = cell.split("&");
				var monthOne = (field[0]).split("-");
				var monthTwo = (field[1]).split("-");
				var monthOneBegin = switchMonth(parseInt(monthOne[0]));
				var monthOneEnd = switchMonth(parseInt(monthOne[1]));
				var monthTwoBegin = switchMonth(parseInt(monthTwo[0]));
				var monthTwoEnd = switchMonth(parseInt(monthTwo[1]));
				return monthOneBegin + " - " + monthOneEnd + ", " + monthTwoBegin + " - " + monthTwoEnd;
			}
			else if (cell.includes("-")){
				var field = cell.split("-");
				var monthBegin = switchMonth(parseInt(field[0]));
				var monthEnd = switchMonth(parseInt(field[1]));
				return monthBegin + " - " + monthEnd;
			}
			else{
				return switchMonth(parseInt(cell));
			}
		}

		const title = "ACNH Database: Fish Details"
		const fish = this.state.fish
		const canShow = this.state.canShow
		
		function card(){
			return(
			<div>
				{canShow && <div class="borderdiv">
					<div class="row no-gutters">
						<div class="col-md-3">
							<img src={fish.image} class="card-img" alt=""
								 style={{maxHeight: '100%', maxWidth: '100%'}}/>
						</div>
						<div class="col-md-6">
							<div class="card-body">
								<h1 class="card-title capitalize"><b>Name: {fish.name}</b></h1>
								<p class="card-text"><b>Month(s) Available in the Northern Hemisphere: </b> {monthFormatter(fish.monthNorth)} </p>
								<p class="card-text"><b>Month(s) Available in the Southern Hemisphere:</b> {monthFormatter(fish.monthSouth)} </p>
								<p class="card-text"><b>Time Available:</b> {fish.time} </p>
								<p class="card-text"><b>Location:</b> {fish.location} </p>
								<p class="card-text"><b>Rarity:</b> {fish.rarity} </p>
								<p class="card-text"><b>Shadow Size:</b> {fish.shadow} </p>
								<p class="card-text"><b>Selling Price:</b> {fish.price} </p>
								<p class="card-text"><b>Catch Phrase:</b> {fish.catchPhrase} </p>
								<p class="card-text"><b>Museum Phrase:</b> {fish.museumPhrase} </p>
							</div>
						</div>
						<div class="col-md-3">
							<img src={fish.icon} class="card-img" alt=""
								 style={{maxHeight: '100%', maxWidth: '100%'}}/>
						</div>
					</div>
				</div>}
				{!canShow && <div class="borderdiv">
					<h5 className="text-center">Error Code: {fish.code} </h5>
					<p className="text-center">{fish.message} </p>
				</div>}
			</div>
			)
		}
		
		return(
			<div>
				<Helmet>
					<title>{title}</title>
				</Helmet>
				<br/>
				{card()}
			</div>
		)
	}
}

export default FishDetails;