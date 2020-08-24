import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {LinkContainer} from 'react-router-bootstrap';
import {Nav, Navbar} from "react-bootstrap";
import {BrowserView, MobileView, isBrowser, isMobile} from "react-device-detect";

export default class Navigation extends React.Component {
    render() {
        return (
			<Navbar bg="primary" expand="lg" variant="dark">
			  <BrowserView>
				<Navbar.Brand href="/">Animal Crossing: New Horizons Database</Navbar.Brand>
			  </BrowserView>
			  <MobileView>
					<Navbar.Brand href="/">AC:NH Database</Navbar.Brand>
			  </MobileView>
			  <Navbar.Toggle aria-controls="basic-navbar-nav" />
			  <Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					<LinkContainer to="/search">
					  <Nav.Link>Search</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/art">
					  <Nav.Link>Art</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/bugs">
					  <Nav.Link>Bugs</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/construction">
					  <Nav.Link>Construction</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/fish">
					  <Nav.Link>Fish</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/fossils">
					  <Nav.Link>Fossils</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/items">
					  <Nav.Link>Items</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/reactions">
					  <Nav.Link>Reactions</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/recipes">
					  <Nav.Link>Recipes</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/sea">
					  <Nav.Link>Sea</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/songs">
					  <Nav.Link>Songs</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/villagers">
					  <Nav.Link>Villagers</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/about">
					  <Nav.Link>About</Nav.Link>
					</LinkContainer>
				</Nav>
			  </Navbar.Collapse>
			</Navbar>
        )
    }
}

