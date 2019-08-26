import React from 'react';
import {Link} from 'react-router-dom';

function WelcomePage() {
    return (<div className="slider">
        <slide class="slide"><p class="slide-number"></p></slide>
        <slide class="slide"><p class="slide-number"></p></slide>
        <slide class="slide"><p class="slide-number"></p></slide>
        <slide class="slide"><p class="slide-number"></p></slide>
        <div className='welcome-button'>
            <p className="welcome-text">Plan your next adventure with us!</p>
            <button id="welcome-button">Are you ready? &nbsp;
                <span><Link to="/sign_in">Start here</Link></span>
            </button>
        </div>
    </div>
    )
}

export default WelcomePage
