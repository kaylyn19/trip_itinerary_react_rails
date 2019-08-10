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

    handleDelete(id) {
        if (window.confirm("Are you sure you want to delete this itinerary?")) {
            Itinerary.destroy(this.state.itineraries.id).then((res) => {
                this.props.history.push('/my_itineraries')
            })
        }
    }

    render() {
        if (!this.state.itineraries.id) {
            return(
                <main className="page">
                    <h1>Itinerary does not exist!</h1>
                </main>
            )
        }
        return(
            <main className="page" style={{display: "flex", flexDirection: "column"}}>
                <ItineraryDetails 
                    name={this.state.itineraries.name}
                    start={this.state.itineraries.start}
                    end={this.state.itineraries.end}
                />
                <DaysList days={this.state.itineraries.days} onDelete={this.handleDelete.bind(this)}/>
            </main>
        )
    }
}