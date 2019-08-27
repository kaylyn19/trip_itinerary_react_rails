import React, {Component} from 'react';
import {Event, AttendingEvent} from '../../api';

import {DateTime} from 'luxon';

export default class EventShowPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: {}
        }
    }

    componentDidMount() {
        Event.show(this.props.match.params.event_id).then(res => {
            this.setState({
                events: res
            })
        })
    }

    handleClick(event, prop, festival) {
        event.preventDefault();
        console.log(prop, festival)
        AttendingEvent.create({
            event_id: prop.match.params.event_id,
            day_id: [festival.start, prop.match.params.id]
        }, prop.match.params.event_id).then(() => {
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
                <button className="btn btn-primary event-button" onClick={(e, id, festival) => this.handleClick(e, this.props, this.state.events)}>Add to itinerary</button>
            </div>
        } else {
            return <main></main>
        }
    }
}