import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./Navigation";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Villagers from "./Villagers";
import FrontPage from "./FrontPage";
import Songs from "./Songs";
import Sea from "./Sea";
import Fossils from "./Fossils";
import SeaMuseum from "./SeaMuseum";

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
						<Route path="/" component={FrontPage}/>
					</Switch>
				</BrowserRouter>
            </div>
        )
    }
}

export default App;

