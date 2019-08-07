import React from 'react';
import ItineraryDetails from '../ItineraryDetails'
import { Itinerary } from '../../api';
import DaysList from '../DaysList';

export default class ItineraryShowPage extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            itineraries: {}
        }    
    }

    componentDidMount() {
        Itinerary.show(this.props.match.params.id).then(trip => {
            this.setState({itineraries: trip})
        })
    }

    render() {
        if (!this.state.itineraries) {
            return(
                <main className="page">
                    <h1>Itinerary does not exist!</h1>
                </main>
            )
        }

        return(
            <main className="page">
                <ItineraryDetails 
                    name={this.state.itineraries.name}
                    start={this.state.itineraries.start}
                    end={this.state.itineraries.end}
                />
                <DaysList days={this.state.itineraries.days}/>
            </main>
        )
    }
}