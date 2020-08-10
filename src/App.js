import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./Navigation";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Villagers from "./Villagers";
import FrontPage from "./FrontPage";
import Songs from "./Songs";
import Sea from "./Sea";
import Recipes from "./Recipes";
import Items from "./Items";
import Fossils from "./Fossils";
import Fish from "./Fish";
import Construction from "./Construction";
import Bugs from "./Bugs";
import Arts from "./Arts";
import About from "./About";
import Details from "./Details";


class App extends React.Component{
	render() {
        return (
            <div>
				<BrowserRouter>
				<Navigation/>
					<Switch>
						<Route path="/villagers" component={Villagers}/>
						<Route path="/songs" component={Songs}/>
						<Route path="/sea" component={Sea}/>
						<Route path="/recipes" component={Recipes}/>
						<Route path="/items" component={Items}/>
						<Route path="/fossils" component={Fossils}/>
						<Route path="/fish" component={Fish}/>
						<Route path="/construction" component={Construction}/>
						<Route path="/bugs" component={Bugs}/>
						<Route path="/art" component={Arts}/>
						<Route path="/details" component={Details}/>
						<Route path="/about" component={About}/>
						<Route exact path="/" component={FrontPage}/>
					</Switch>
				</BrowserRouter>
            </div>
        )
    }
}

export default App;

