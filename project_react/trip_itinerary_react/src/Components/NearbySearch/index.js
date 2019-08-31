import React, {Component} from 'react';
import {Place} from '../../api';

export default class NearbySearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            place: {}
        }
    }
    
    componentDidMount() {
        Place.show(this.props.location.state.name).then(res => {
            const google = window.google;
            let pyrmont = new google.maps.LatLng(res.latitude, res.longitude);
            const service = new google.maps.places.PlacesService(pyrmont);
            service.nearbySearch({
                location: pyrmont,
                radius: '500',
                type: ['restaurant']
            }, (results, status) => {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    console.log(results)
                }
            })
            // this.setState({
            //     place: res
            // })
        })
    }
    
    // function handleClick() {
        //     const google = window.google;
        //     let pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
    //     const map = new google.maps.Map(document.getElementById('place'));
    
    //     const service = new google.maps.places.PlacesService(map);
    //     service.nearbySearch({
        //       location: pyrmont,
        //       radius: '500',
        //       type: ['restaurant']
        //     }, (results, status) => {
            //       if (status == google.maps.places.PlacesServiceStatus.OK) {
                //         //   console.log(this.props)
    //         for (var i = 0; i < results.length; i++) {
    //           console.log(results, status)
    //         }
    //       }
    //     })
    // }
    
    render() {
        return <main> 
            <p>show: {this.state.place.name}</p>
        </main>
    }
}