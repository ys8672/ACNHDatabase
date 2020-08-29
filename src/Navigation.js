import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {LinkContainer} from 'react-router-bootstrap';
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {BrowserView, MobileView, isBrowser, isMobile} from "react-device-detect";

export default class Navigation extends React.Component {
    render() {
        return (
			<Navbar collapseOnSelect bg="primary" expand="lg" variant="dark">
			  <BrowserView>
				<Navbar.Brand href="/">Animal Crossing: New Horizons Database</Navbar.Brand>
			  </BrowserView>
			  <MobileView>
					<Navbar.Brand href="/">AC:NH Database</Navbar.Brand>
			  </MobileView>
			  <Navbar.Toggle aria-controls="basic-navbar-nav" />
			  <Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					<LinkContainer to="/art">
					  <Nav.Link>Art</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/clothes">
					  <Nav.Link>Clothes</Nav.Link>
					</LinkContainer>
					<NavDropdown title="Creatures">
						<NavDropdown.Item id='nav-item'>
							<LinkContainer to="/bugs">
								<Nav.Link>Bugs</Nav.Link>
							</LinkContainer>
						</NavDropdown.Item>
						<NavDropdown.Item id='nav-item'>
							<LinkContainer to="/fish">
							  <Nav.Link>Fish</Nav.Link>
							</LinkContainer>
						</NavDropdown.Item>
						<NavDropdown.Item id='nav-item'>
							<LinkContainer to="/sea">
							  <Nav.Link>Sea</Nav.Link>
							</LinkContainer>
						</NavDropdown.Item>
					</NavDropdown>
					<LinkContainer to="/construction">
					  <Nav.Link>Construction</Nav.Link>
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
					<LinkContainer to="/songs">
					  <Nav.Link>Songs</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/villagers">
					  <Nav.Link>Villagers</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/search">
					  <Nav.Link>Search</Nav.Link>
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

