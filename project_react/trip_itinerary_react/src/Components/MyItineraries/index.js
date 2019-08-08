import React, {Component} from 'react';
import {User} from '../../api'
import {Link} from 'react-router-dom'

export default class MyItineraries extends Component {
    constructor(props) {
        const {currentUser} = props;

        super(props)
        this.state = {
            trips: []
        }
    }

    componentDidMount() {
        User.show(this.props.match.params.id).then(list => {
            this.setState({trips: list})
        })
    }

    render() {
        if (this.state.trips.length === 0) {
            return <h1>Your list is empty!</h1>
        }
        return(
            <div>
                {this.state.trips.map(trip => {
                    return(
                        <div className="itinerary-card">
                            <h1><Link to={`/itineraries/${trip.id}`}>{trip.name}</Link></h1>
                            <p>From {trip.start} To {trip.end}</p>
                        </div>
                    )
                })}
            </div>
        )    
    }
}