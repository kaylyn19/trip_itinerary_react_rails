import React, {Component} from 'react';
import {Map, InfoWindow, GoogleApiWrapper, Marker} from 'google-maps-react';
import {Button, ButtonToolbar} from 'react-bootstrap'
require('dotenv').config()
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

class MapContainer extends Component {
    constructor(props) {
        super(props)

        const {days} = props;
        const coord_set = [];
        days.map((each_day, index) => {
            each_day.places.map(place => {
                coord_set.push([place.latitude, place.longitude, place.name])
            })
        })

        this.state = {
            coordinates: coord_set,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        }    
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }

    render() {
        return( <div style={{position: "relative"}}>
                <ButtonToolbar>
                    <Button href={`/itineraries/${this.props.days[0].itinerary_id}/edit`}variant="success" onClick={this.props.onEditClick}>Edit</Button>
                    <Button variant="success" onClick={this.props.onDeleteClick} >Delete</Button>
                </ButtonToolbar>
                <Map className="map" google={this.props.google} zoom={12} style={{width: '800px', position: 'relative', height: '500px'}} initialCenter={{lat: this.state.coordinates[0][0], lng: this.state.coordinates[0][1]}}>
                    {
                        this.state.coordinates.map((coord, index) => {
                            return(
                                <Marker key={index} onClick={this.onMarkerClick} name={coord[2]} position={{lat: coord[0], lng: coord[1]}}>
                                </Marker>
                            )
                        })
                    }
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div><h3>{this.state.selectedPlace.name}</h3></div> 
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}

// export default MapContainer

export default GoogleApiWrapper({
    apiKey: API_KEY
})(MapContainer)