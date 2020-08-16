import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./Navigation";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Villagers from "./Villagers";
import VillagerDetails from "./details/VillagerDetails";
import Songs from "./Songs";
import SongDetails from "./details/SongDetails";
import Sea from "./Sea";
import SeaDetails from "./details/SeaDetails";
import Recipes from "./Recipes";
import RecipeDetails from "./details/RecipeDetails";
import Items from "./Items";
import ItemDetails from "./details/ItemDetails";
import Fossils from "./Fossils";
import FossilDetails from "./details/FossilDetails";
import Fish from "./Fish";
import FishDetails from "./details/FishDetails";
import Construction from "./Construction";
import ConstructionDetails from "./details/ConstructionDetails";
import Bugs from "./Bugs";
import BugDetails from "./details/BugDetails";
import Arts from "./Arts";
import ArtDetails from "./details/ArtDetails";
import About from "./About";
import Search from "./Search";
import FrontPage from "./FrontPage";


class App extends React.Component{
	render() {
        return (
            <div>
				<BrowserRouter>
				<Navigation/>
					<Switch>
						<Route exact path="/villagers" component={Villagers}/>
						<Route path="/villagers/:id" component={VillagerDetails}/>
						<Route exact path="/songs" component={Songs}/>
						<Route path="/songs/:id" component={SongDetails}/>
						<Route exact path="/sea" component={Sea}/>
						<Route path="/sea/:id" component={SeaDetails}/>
						<Route exact path="/recipes" component={Recipes}/>
						<Route path="/recipes/:id" component={RecipeDetails}/>
						<Route exact path="/items" component={Items}/>
						<Route path="/items/:id" component={ItemDetails}/>
						<Route exact path="/fossils" component={Fossils}/>
						<Route path="/fossils/:id" component={FossilDetails}/>
						<Route exact path="/fish" component={Fish}/>
						<Route path="/fish/:id/" component={FishDetails}/>
						<Route exact path="/construction" component={Construction}/>
						<Route path="/construction/:id" component={ConstructionDetails}/>
						<Route exact path="/bugs" component={Bugs}/>
						<Route path="/bugs/:id" component={BugDetails}/>
						<Route exact path="/art" component={Arts}/>
						<Route path="/art/:id" component={ArtDetails}/>
						<Route path="/search" component={Search}/>
						<Route path="/about" component={About}/>
						<Route exact path="/" component={FrontPage}/>
					</Switch>
				</BrowserRouter>
            </div>
        )
    }
}

export default App;

