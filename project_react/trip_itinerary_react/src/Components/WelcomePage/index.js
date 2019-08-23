import React from 'react';
import {Link} from 'react-router-dom';

function WelcomePage() {
    return (//<main className="landing-page">
        <div className="slider">
            <slide class="slide"><p class="slide-number">1</p></slide>
            <slide class="slide"><p class="slide-number">2</p></slide>
            <slide class="slide"><p class="slide-number">3</p></slide>
            <slide class="slide"><p class="slide-number">4</p></slide>
        </div>
        )
        {/* <div id="test">    
            <p className="welcome-text">Plan your next adventure with us!</p>
            <button id="welcome-button">Are you ready? &nbsp;
                <span><Link to="/sign_in">Start here</Link></span>
            </button>
        </div> */}
    // </main>
    
}

export default WelcomePage
