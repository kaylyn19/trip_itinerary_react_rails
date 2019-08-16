import React from 'react';
import {Link} from 'react-router-dom';
import ReactWeather from 'react-open-weather';
import 'react-open-weather/lib/css/ReactWeather.css';
require('dotenv').config()
const API_KEY = process.env.OPEN_WEATHER_API_KEY


function WelcomePage() {
    return <main className="landing-page">
        <div className="container" width="100" height="100">
        <ReactWeather forecast="5days" apikey="eefb90a65f4b4e94afc185114191608" type="city" city="Vancouver "/>
        </div>
        <div id="test">    
            <p className="welcome-text">Plan your next adventure with us!</p>
            <button id="welcome-button">Are you ready? &nbsp;
                <span><Link to="/sign_in">Start here</Link></span>
            </button>
        </div>
    </main>
}export default WelcomePage
