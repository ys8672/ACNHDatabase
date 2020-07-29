import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Villagers from "./Villagers";
import FrontPage from "./FrontPage";
import Songs from "./Songs";

class App extends React.Component{
	render() {
        return (
            <div>
				<BrowserRouter>
					<Switch>
						<Route path="/villagers" component={Villagers}/>
						<Route path="/songs" component={Songs}/>
						<Route path="/" component={FrontPage}/>
					</Switch>
				</BrowserRouter>
            </div>
        )
    }
}

export default App;
