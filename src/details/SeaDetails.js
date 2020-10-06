import React from 'react'
import { Helmet } from 'react-helmet'

class SeaDetails extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            sea: {},
			canShow: true
        }
    }
	
	componentDidMount() {
		fetch(`/api${this.props.location.pathname}`).then(r => r.json()).then(sea_by_ID => {
			this.setState({sea: sea_by_ID})
			if('code' in sea_by_ID){
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
			else{
				var field2 = cell.split("-");
				var monthBegin = switchMonth(parseInt(field2[0]));
				var monthEnd = switchMonth(parseInt(field2[1]));
				return monthBegin + " - " + monthEnd;
			}
		}
		
		const title = "ACNH Database: Sea Details"
		const sea = this.state.sea
		const canShow = this.state.canShow
		return(
			<div>
				<Helmet>
					<title>{title}</title>
				</Helmet>
				<br/>
				{canShow && <div class="borderdiv">
					<div class="row no-gutters">
						<div class="col-md-3">
							<img src={sea.image} class="card-img" alt=""
								 style={{maxHeight: '100%', maxWidth: '100%'}}/>
						</div>
						<div class="col-md-6">
							<div class="card-body">
								<h1 class="card-title capitalize"><b>Name: {sea.name}</b></h1>
								<p class="card-text"><b>Months Available (Northern Hemisphere): </b> {monthFormatter(sea.monthNorth)} </p>
								<p class="card-text"><b>Months Available (Southern Hemisphere):</b> {monthFormatter(sea.monthSouth)} </p>
								<p class="card-text"><b>Time Available:</b> {sea.time} </p>
								<p class="card-text"><b>Movement Speed:</b> {sea.speed} </p>
								<p class="card-text"><b>Shadow Size:</b> {sea.shadow} </p>
								<p class="card-text"><b>Sell Price:</b> {sea.price} </p>
								<p class="card-text"><b>Catch Phrase:</b> {sea.catchPhrase} </p>
								<p class="card-text"><b>Museum Description:</b> {sea.museumPhrase} </p>
							</div>
						</div>
						<div class="col-md-3">
							<img src={sea.icon} class="card-img" alt=""
								 style={{maxHeight: '100%', maxWidth: '100%'}}/>
						</div>
					</div>
				</div>}
				{!canShow && <div class="borderdiv">
					<h5 className="text-center">Error Code: {sea.code} </h5>
					<p className="text-center">{sea.message} </p>
				</div>}
			</div>
		)
	}
}

export default SeaDetails;