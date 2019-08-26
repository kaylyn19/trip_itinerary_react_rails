import React, {Component} from 'react';
import {User} from '../../api'
import {Link} from 'react-router-dom';
import {DateTime} from 'luxon';

export default class MyItineraries extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trips: []
        }
    }

    componentDidMount() {
        const {startLoading, stopLoading} = this.props;
        startLoading();
        User.show(this.props.match.params.id).then(list => {
            stopLoading();
            this.setState({trips: list})
        })
    }

    render() {
        if (this.state.trips.length === 0) {
            return <div className="no-trips"><h1>Your list is empty!</h1></div>
        }
        return(
            <div className="itinerary-cards">
                {this.state.trips.map(trip => {
                    return(
                        <div key={trip.id} className="itinerary-card">

                            <h3 className="id"><Link to={`/itineraries/${trip.id}`}>{trip.name}</Link></h3>
                            <p>From {DateTime.fromISO(trip.start, {zone: 'utc'}).toFormat('LLL dd yyyy')} To {DateTime.fromISO(trip.end, {zone: 'utc'}).toFormat('LLL dd yyyy')}</p>
                        </div>
                    )
                })}
            </div>
        )    
    }
}