import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./Navigation";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Villagers from "./Villagers";
import FrontPage from "./FrontPage";
import Songs from "./Songs";
import Sea from "./Sea";
import SeaMuseum from "./SeaMuseum";
import Fossils from "./Fossils";
import Fish from "./Fish";


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
						<Route path="/seadetail" component={SeaMuseum}/>
						<Route path="/fossils" component={Fossils}/>
						<Route path="/fish" component={Fish}/>
						<Route exact path="/" component={FrontPage}/>
					</Switch>
				</BrowserRouter>
            </div>
        )
    }
}

export default App;

