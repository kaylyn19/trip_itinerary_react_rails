import React from 'react';
import {Link} from 'react-router-dom';
import { Session } from '../../api';

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
            <div>
                <Link to='/'>Home</Link>
                |
                <Link to='/itineraries/new'>Create Itinerary</Link>
                |
                <Link to='/my_itineraries'>My Itineraries</Link>
                |
                <Link onClick={handleSignout}>Sign Out</Link>
                |
                <div>Signed in as: {currentUser.full_name}</div>
            </div>
        )
    }
    return(
        <div>
            <Link to='/'>Home</Link>
            |
            <Link to='/itineraries/new'>Create Itinerary</Link>
            |
            <Link to='/sign_in'>Sign In</Link>
            |
            <Link to='/sign_up'>Sign Up</Link>
        </div>
    )
}
