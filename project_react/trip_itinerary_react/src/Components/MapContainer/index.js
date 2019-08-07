import React, {Component} from 'react';
import {Map, InfoWindow, GoogleApiWrapper, Marker} from 'google-maps-react';
require('dotenv').config()
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

class MapContainer extends Component {
    constructor(props) {
        super(props)

        const {coordinates} = props;
        const coord_set = [];
        coordinates.map(coord => {
            coord_set.push([coord.latitude, coord.longitude, coord.name])
        })

        this.state = coord_set    
    }

    displayMarkers = () => {
        return this.state.map((coord, index) => {
            return <Marker key={index} id={index} position={{
                lat: coord.latitude,
                lng: coord.longitude
            }}
            onClick={() => console.log("location")}
            />
        })
    }

    render() {
        console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
        return(
            <Map 
                google={this.props.google}
                zoom={8}
                style={{width: '800px', height: '500px'}}
            >
                {this.displayMarkers()}
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: API_KEY
})(MapContainer)