import React from 'react'
import { Helmet } from 'react-helmet'
import {BrowserView, MobileView, isBrowser, isMobile} from "react-device-detect";

class ConstructionDetails extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            construction: {},
			canShow: true
        }
    }
	

	componentDidMount() {
		fetch(`/api/${this.props.location.pathname}`).then(r => r.json()).then(construction_by_ID => {
			this.setState({construction: construction_by_ID})
			if('code' in construction_by_ID){
				this.setState({canShow: false});
			}
        })
	}

	render() {
		const title = "ACNH Database: Construction Details"
		const construction = this.state.construction
		const canShow = this.state.canShow
		
		function card(){
			return(
				<div>
					{canShow && <div class="borderdiv">
						<div class="row no-gutters">
							<div class="col-md-4">
								<img src={construction.image} class="card-img" alt=""
									 style={{maxHeight: '100%', maxWidth: '100%'}}/>
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h1 class="card-title capitalize"><b>Name: {construction.name}</b></h1>
									<p class="card-text"><b>Purchase Price:</b> {construction.buyPrice} </p>
									<p class="card-text"><b>Source:</b> {construction.source} </p>
									<p class="card-text"><b>Category:</b> {construction.category} </p>
								</div>
							</div>
						</div>
					</div>}
					{!canShow && <div class="borderdiv">
						<h5 className="text-center">Error Code: {construction.code} </h5>
						<p className="text-center">{construction.message} </p>
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

export default ConstructionDetails;