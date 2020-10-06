import React from 'react'
import { Helmet } from 'react-helmet'
import {BrowserView, MobileView} from "react-device-detect";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

class ItemDetails extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            item: {},
			canShow: true
        }
    }
	

	componentDidMount() {
		fetch(`/api${this.props.location.pathname}`).then(r => r.json()).then(item_by_ID => {
			this.setState({item: item_by_ID})
			if('code' in item_by_ID){
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
		
		function kitCostFormatter(str) {
			var cell = String(str)
			if(cell === '-1'){
				return "Not Customizable"
			}
			return parseInt(cell)
		}
		
		function buyFormatter(price) {
			var cost = parseInt(price)
			if(Number.isNaN(cost)){
				return "Not Purchasable"
			}
			return cost
		}
		
		function emptyFormatter(str) {
			var cell = String(str)
			if(cell === ''){
				return "N/A"
			}
			return cell
		}
		
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
		
		function card(){
			return(
				<div>
					{canShow && <div class="borderdiv">
						<div class="row no-gutters">
							<div class="col-md-4">
								{imageFormatter(item.image)}
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h1 class="card-title capitalize"><b>Name: {item.name}</b></h1>
									<p class="card-text"><b>Customization Kit Cost:</b> {kitCostFormatter(item.kitCost)} </p>
									<p class="card-text"><b>Size: </b> {item.size} </p>
									<p class="card-text"><b>Source:</b> {item.source} </p>
									<p class="card-text"><b>Interactability:</b> {booleanFormatter(item.isInteractive)} </p>
									<p class="card-text"><b>Purchase Price:</b> {buyFormatter(item.buyPrice)} </p>
									<p class="card-text"><b>Sell Price:</b> {item.sellPrice} </p>
									<p class="card-text"><b>Type:</b> {item.typeof} </p>
									<p class="card-text"><b>Category:</b> {item.category} </p>
									<p class="card-text"><b>Variations:</b> {emptyFormatter(item.variant)} </p>
									<p class="card-text"><b>Patterns:</b> {emptyFormatter(item.pattern)} </p>
								</div>
							</div>
						</div>
					</div>}
					{!canShow && <div class="borderdiv">
						<h5 className="text-center">Error Code: {item.code} </h5>
						<p className="text-center">{item.message} </p>
					</div>}
				</div>
			)
		}
		
		const title = "ACNH Database: Item Details"
		const item = this.state.item
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

export default ItemDetails;