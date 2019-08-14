import React from 'react';
import {Link} from 'react-router-dom'

function WelcomePage() {
    return <main className="landing-page">
        <div id="test">    
            <p className="welcome-text">Plan your next adventure with us!</p>
            <button id="welcome-button">Are you ready? &nbsp;
                <span><Link to="/sign_in">Start here</Link></span>
                {/* <span>Start here.</span> */}
            </button>
        </div>
    </main>
}export default WelcomePage
