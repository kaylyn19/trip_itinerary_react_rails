import React from 'react';
import {Link} from 'react-router-dom';
import { Session } from '../../api';
import {Navbar, Nav, NavbarCollapse, NavLink, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
// import {Button, Nav, etc} from 'react-bootstrap'


export default function NavBar(props) {
    const { currentUser, onSignOut } = props
    function handleSignout(event) {
        event.preventDefault();
        Session.destroy().then(() => {
            onSignOut();
        })
    }

    if (currentUser) {
        return(
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    {/* You need as={Link} to be able to use routerlink + bootstrap navlink */}
                                    <Nav.Link  as={Link} to='/itineraries/new' >Create Itinerary</Nav.Link> 
                                    <Nav.Link as={Link} to='/my_itineraries'>My Itineraries</Nav.Link>
                                </Nav>
                        <Form inline className="dropleft">
                            <Nav.Link as={Link} to="#" onClick={handleSignout}>Sign Out</Nav.Link>
                        </Form>
                    </Navbar.Collapse>
            </Navbar>         
            )
    }
    return(
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/* You need as={Link} to be able to use routerlink + bootstrap navlink */}
                    {/* <Nav.Link  as={Link} to='/itineraries/new' >Create Itinerary</Nav.Link>  */}
                    <Nav.Link  as={Link} to='/itineraries/new' >Create Itinerary</Nav.Link> 
                </Nav>
                <Form inline className="dropleft">
                <Nav.Link as={Link} to='/sign_in'>Sign In</Nav.Link>
               <Nav.Link as={Link} to='/sign_up'>Sign Up</Nav.Link>
                </Form>
            </Navbar.Collapse>
        </Navbar> 
    )
}
