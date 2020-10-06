import React from 'react'
import { Helmet } from 'react-helmet'
import {BrowserView, MobileView} from "react-device-detect";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

class ToolDetails extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            tool: {},
			canShow: true
        }
    }
	

	componentDidMount() {
		fetch(`/api${this.props.location.pathname}`).then(r => r.json()).then(tool_by_ID => {
			this.setState({tool: tool_by_ID})
			if('code' in tool_by_ID){
				this.setState({canShow: false});
			}
        })
	}
	
	render() {
		function imageFormatter(image){
			var cell = String(image)
			var imageArray = cell.split(',');
			const img = imageArray.map(str => 
				<img src={str} class="card-img" alt=""
					style={{maxHeight: '100%', maxWidth: '100%'}}/>
			)
            return (
				<div>
					<AliceCarousel
						items={img}
						autoPlayInterval={3000}
						autoPlay={true}
						fadeOutAnimation={true}
						mouseTrackingEnabled={true}
						disableAutoPlayOnAction={true}
					  />
				</div>
            );
		}
		
		function kitCostFormatter(cost) {
			var cell = parseInt(cost)
			if(cell === -1){
				return "Not Customizable"
			}
			return parseInt(cell)
		}
		
		function usesFormatter(cost) {
			var cell = parseInt(cost)
			if(cell === -1){
				return "Infinite"
			}
			return parseInt(cell)
		}
		
		function buyFormatter(cost) {
			var cell = parseInt(cost)
			if(cell === -1){
				return "Not Buyable"
			}
			return parseInt(cell)
		}
		
		function card(){
			return(
				<div>
					{canShow && <div class="borderdiv">
						<div class="row no-gutters">
							<div class="col-md-4">
								{imageFormatter(tool.image)}
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h1 class="card-title capitalize"><b>Name: {tool.name}</b></h1>
									<p class="card-text"><b>Recipe:</b> {tool.diy} </p>
									<p class="card-text"><b>Customization Kit Cost: </b> {kitCostFormatter(tool.kitcost)} </p>
									<p class="card-text"><b>Uses:</b> {usesFormatter(tool.uses)} </p>
									<p class="card-text"><b>Stack Size:</b> {tool.stacksize} </p>
									<p class="card-text"><b>Purchase Price:</b> {buyFormatter(tool.buy)} </p>
									<p class="card-text"><b>Sell Price:</b> {tool.sell} </p>
									<p class="card-text"><b>Source:</b> {tool.source} </p>
									<p class="card-text"><b>Variations:</b> {tool.variations} </p>

								</div>
							</div>
						</div>
					</div>}
					{!canShow && <div class="borderdiv">
						<h5 className="text-center">Error Code: {tool.code} </h5>
						<p className="text-center">{tool.message} </p>
					</div>}
				</div>
			)
		}
		
		const title = "ACNH Database: tool Details"
		const tool = this.state.tool
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

export default ToolDetails;