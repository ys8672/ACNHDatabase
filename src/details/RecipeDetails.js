import React from 'react'
import { Helmet } from 'react-helmet'

class RecipeDetails extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            recipe: {},
			canShow: true
        }
    }
	
	componentDidMount() {
		fetch(`/api/${this.props.location.pathname}`).then(r => r.json()).then(recipe_by_ID => {
			this.setState({recipe: recipe_by_ID})
			if('code' in recipe_by_ID){
				this.setState({canShow: false});
			}
        })
	}
	
	render() {
		const title = "ACNH Database: Recipe Details"
		const recipe = this.state.recipe
		const canShow = this.state.canShow
		return(
			<div class="recipepadding">
				<Helmet>
					<title>{title}</title>
				</Helmet>
				<br/>
				{canShow && <div class="borderdiv">
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
				</div>}
				{!canShow && <div class="borderdiv">
					<h5 className="text-center">Error Code: {recipe.code} </h5>
					<p className="text-center">{recipe.message} </p>
				</div>}
			</div>
		)
	}
}

export default RecipeDetails;