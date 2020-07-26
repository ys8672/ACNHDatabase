import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Villagers from "./Villagers";
import FrontPage from "./FrontPage";


class App extends React.Component{
	render() {
        return (
            <div>
				<BrowserRouter>
					<Switch>
						<Route path="/villagers" component={Villagers}/>
						<Route path="/" component={FrontPage}/>
					</Switch>
				</BrowserRouter>
            </div>
        )
    }
}

export default App;
