import React from 'react';
import {Link} from 'react-router-dom';

export default function NavBar() {
    return(
        <div>
            <Link to='/'>Home</Link>
            |
            <Link to='/itineraries/new'>Create Itinerary</Link>
            |
            <Link to='/sign_in'>Sign In</Link>
            |
            <Link to='/sign_up'>Sign Up</Link>
            |

        </div>
    )
}
