import React from 'react'
import { Helmet } from 'react-helmet'

class VillagerDetails extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            villager: {},
			canShow: true
        }
    }
	

	componentDidMount() {
		fetch(`/api/${this.props.location.pathname}`).then(r => r.json()).then(villager_by_ID => {
			this.setState({villager: villager_by_ID})
			if('code' in villager_by_ID){
				this.setState({canShow: false});
			}
        })
	}
	


	render() {
		const title = "ACNH Database: Villager Details"
		const villager = this.state.villager
		const canShow = this.state.canShow
		return(
			<div class="frontpagepadding">
				<Helmet>
					<title>{title} </title>
				</Helmet>
				<br/>
				{canShow && <div class="borderdiv">
					<div class="row no-gutters">
						<div class="col-md-4">
							<img src={villager.image} class="card-img" alt=""
								 style={{maxHeight: '100%', maxWidth: '100%'}}/>
						</div>
						<div class="col-md-4">
							<div class="card-body">
								<h1 class="card-title"><b>Name: {villager.name}</b></h1>
								<p class="card-text"><b>Personality:</b> {villager.personality} </p>
								<p class="card-text"><b>Birthday:</b> {villager.birthdayString} </p>
								<p class="card-text"><b>Species: </b> {villager.species} </p>
								<p class="card-text"><b>Gender:</b> {villager.gender} </p>
								<p class="card-text"><b>Catch Phrase:</b> {villager.catchPhrase} </p>
							</div>
						</div>
						<div class="col-md-4">
							<img src={villager.icon} class="card-img" alt=""
								 style={{maxHeight: '100%', maxWidth: '100%'}}/>
						</div>
					</div>
				</div>}
				{!canShow && <div class="borderdiv">
					<h5 className="text-center">Error Code: {villager.code} </h5>
					<p className="text-center">{villager.message} </p>
				</div>}

			</div>
		)
	}
}

export default VillagerDetails;