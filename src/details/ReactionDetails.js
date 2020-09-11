import React from 'react'
import { Helmet } from 'react-helmet'
import {BrowserView, MobileView} from "react-device-detect";

class ReactionDetails extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            reaction: {},
			canShow: true
        }
    }
	

	componentDidMount() {
		fetch(`/api/${this.props.location.pathname}`).then(r => r.json()).then(reaction_by_ID => {
			this.setState({reaction: reaction_by_ID})
			if('code' in reaction_by_ID){
				this.setState({canShow: false});
			}
        })
	}
	
	render() {
		
		function card(){
			return(
				<div>
					{canShow && <div class="borderdiv">
						<div class="row no-gutters">
							<div class="col-md-4">
								<img src={reaction.image} class="card-img" alt=""
									 style={{maxHeight: '100%', maxWidth: '100%'}}/>
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h1 class="card-title capitalize"><b>Name: {reaction.name}</b></h1>
									<p class="card-text"><b>Where To Acquire:</b> {reaction.source} </p>
									<p class="card-text"><b>Important Notes:</b> {reaction.sourceNotes} </p>
								</div>
							</div>
						</div>
					</div>}
					{!canShow && <div class="borderdiv">
						<h5 className="text-center">Error Code: {reaction.code} </h5>
						<p className="text-center">{reaction.message} </p>
					</div>}
				</div>
			)
		}
		
		const title = "ACNH Database: Reaction Details"
		const reaction = this.state.reaction
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

export default ReactionDetails;