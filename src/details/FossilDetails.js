import React from 'react'
import { Helmet } from 'react-helmet'
import {BrowserView, MobileView} from "react-device-detect";

class FossilDetails extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            fossil: {},
			canShow: true
        }
    }
	

	componentDidMount() {
		fetch(`/api${this.props.location.pathname}`).then(r => r.json()).then(fossil_by_ID => {
			this.setState({fossil: fossil_by_ID})
			if('code' in fossil_by_ID){
				this.setState({canShow: false});
			}
        })
	}

	render() {
		const title = "ACNH Database: Fossil Details"
		const fossil = this.state.fossil
		const canShow = this.state.canShow
		
		function card(){
			return(
			<div>
				{canShow && <div class="borderdiv">
					<div class="row no-gutters">
						<div class="col-md-4">
							<img src={fossil.image} class="card-img" alt=""
								 style={{maxHeight: '100%', maxWidth: '100%'}}/>
						</div>
						<div class="col-md-8">
							<div class="card-body">
								<h1 class="card-title capitalize"><b>Name: {fossil.name}</b></h1>
								<p class="card-text"><b>Sell Price:</b> {fossil.price} </p>
								<p class="card-text"><b>Museum Description:</b> {fossil.museumPhrase} </p>

							</div>
						</div>
					</div>
				</div>}
				{!canShow && <div class="borderdiv">
					<h5 className="text-center">Error Code: {fossil.code} </h5>
					<p className="text-center">{fossil.message} </p>
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

export default FossilDetails;