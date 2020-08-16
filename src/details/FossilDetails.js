import React from 'react'
import { Helmet } from 'react-helmet'

class FossilDetails extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            fossil: {}
        }
    }
	

	componentDidMount() {
		fetch(`/api/${this.props.location.pathname}`).then(r => r.json()).then(fossil_by_ID => {
			this.setState({fossil: fossil_by_ID})
        })
	}

	render() {
		const title = "ACNH Database: Fossil Details"
		const fossil = this.state.fossil
		return(
			<div class="frontpagepadding">
				<Helmet>
					<title>{title} </title>
				</Helmet>
				<br/>
				<div class="borderdiv">
					<div class="row no-gutters">
						<div class="col-md-4">
							<img src={fossil.image} class="card-img" alt=""
								 style={{maxHeight: '100%', maxWidth: '100%'}}/>
						</div>
						<div class="col-md-8">
							<div class="card-body">
								<h1 class="card-title capitalize"><b>Name: {fossil.name}</b></h1>
								<p class="card-text"><b>Selling Price:</b> {fossil.price} </p>
								<p class="card-text"><b>Museum Description:</b> {fossil.museumPhrase} </p>

							</div>
						</div>
					</div>
				</div>

			</div>
		)
	}
}

export default FossilDetails;