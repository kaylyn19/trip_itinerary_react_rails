import React, {Component} from 'react';
import {Event} from '../../api';
import {DateTime} from 'luxon'

export default class SavedEventPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: {}
        }
    }

    componentDidMount() {
        Event.show(this.props.match.params.event_id).then( res => {
            this.setState({
                events: res
            })
        })
    }

    handleDelete(event, prop) {
        Event.destroy(prop.match.params.event_id).then (res => {
            prop.history.push(`/itineraries/${prop.match.params.id}`)
        })
    }

    render() {
        if (this.state.events) {
            return <div className="event-showpage">
                <p className="event-name">{this.state.events.name}</p>
                <p className="event-address">{this.state.events.address}</p>
                <p className="event-start">Starts: {DateTime.fromISO(this.state.events.start, {zone: 'utc'}).toFormat("LLL dd yyyy 'at' HH ':' mm")}</p>
                <p className="event-end">Ends: {DateTime.fromISO(this.state.events.end, {zone: 'utc'}).toFormat("LLL dd yyyy 'at' HH ':' mm")}</p>
                <p className="event-category">Category: {this.state.events.labels}</p>
                <p className="event-about"></p>
                <p className="event-description"><p className="event-about">About this event:</p> <br/>{this.state.events.description}</p>
                <button className="btn btn-primary event-button" onClick={(e, prop) => this.handleDelete(e, this.props)}>Remove from itinerary</button>

            </div>
        } else {
            return <main></main>
        }
    }
}