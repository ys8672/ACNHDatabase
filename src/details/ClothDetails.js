import React from 'react'
import { Helmet } from 'react-helmet'
import {BrowserView, MobileView} from "react-device-detect";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

class ClothDetails extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            cloth: {},
			canShow: true
        }
    }
	

	componentDidMount() {
		fetch(`/api/${this.props.location.pathname}`).then(r => r.json()).then(cloth_by_ID => {
			this.setState({cloth: cloth_by_ID})
			if('code' in cloth_by_ID){
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
		
		function buyFormatter(cell, row) {
			if(cell === -1){
				return "Not Buyable"
			}
			return parseInt(cell)
		}
		
		function booleanFormatter(cell, row) {
			if(cell === true){
				return ("Yes")
			}
			return ("No")
		}
		
		function variationFormatter(cell, row) {
			if(cell === null){
				return "N/A"
			}
			return cell
		}
		
		function card(){
			return(
				<div>
					{canShow && <div class="borderdiv">
						<div class="row no-gutters">
							<div class="col-md-4">
								{imageFormatter(cloth.image)}
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h1 class="card-title capitalize"><b>Clothing Name: {cloth.name}</b></h1>
									<p class="card-text"><b>Clothing Type: </b> {cloth.sourceSheet} </p>
									<p class="card-text"><b>Purchase Price: </b> {buyFormatter(cloth.buy)} </p>
									<p class="card-text"><b>Selling Price </b> {cloth.sell} </p>
									<p class="card-text"><b>Where To Find?: </b> {cloth.source} </p>
									<p class="card-text"><b>Seasons Available: </b> {cloth.seasonal} </p>
									<p class="card-text"><b>Villager Equippable?: </b> {booleanFormatter(cloth.villager)} </p>
									<p class="card-text"><b>Themes: </b> {cloth.themes} </p>
									<p class="card-text"><b>Variations: </b> {variationFormatter(cloth.variations)} </p>
								</div>
							</div>
						</div>
					</div>}
					{!canShow && <div class="borderdiv">
						<h5 className="text-center">Error Code: {cloth.code} </h5>
						<p className="text-center">{cloth.message} </p>
					</div>}
				</div>
			)
		}
		
		const title = "ACNH Database: Cloth Details"
		const cloth = this.state.cloth
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

export default ClothDetails;