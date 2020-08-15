import React from 'react'
import {Link} from "react-router-dom";
import { Helmet } from 'react-helmet'

class RecipeDetails extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            recipe: {}
        }
    }
	
	componentDidMount() {
		fetch(`/api/${this.props.location.pathname}`).then(r => r.json()).then(recipe_by_ID => {
			this.setState({recipe: recipe_by_ID})
        })
	}
	
	render() {
		const title = "ACNH Database: Recipe Details"
		const recipe = this.state.recipe
		return(
			<div class="frontpagepadding">
				<Helmet>
					<title>{title}</title>
				</Helmet>
				<br/>
				<div class="borderdiv">
					<div class="row no-gutters">
						<div class="col-md-6">
							<div class="card-body">
								<h1 class="card-title capitalize"><b>Name: {recipe.name}</b></h1>
								<p class="card-text"><b>Purchase Price: </b> {recipe.buyPrice} </p>
								<p class="card-text"><b>Selling Price:</b> {recipe.sellPrice} </p>
								<p class="card-text"><b>Where To Find:</b> {recipe.source} </p>
								<p class="card-text"><b>Number of Recipes Needed To Unlock:</b> {recipe.recipesToUnlock} </p>
								<p class="card-text"><b>Category:</b> {recipe.category} </p>
								<p class="card-text capitalize"><b>Recipe Color:</b> {recipe.cardColor} </p>
								<p class="card-text"><b>Recipe Materials:</b> {recipe.materials} </p>
								<p class="card-text"><b>Recipe Other Notes:</b> {recipe.sourceNotes} </p>
							</div>
						</div>
					</div>
				</div>
				<br/>
				<div class="text-center">
					<Link to={{pathname:`/`}}>Return to home page</Link>
				</div>
			</div>
		)
	}
}

export default RecipeDetails;