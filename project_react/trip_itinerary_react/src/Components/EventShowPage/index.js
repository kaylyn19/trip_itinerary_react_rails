import React, {Component} from 'react';
import {Event, AttendingEvent} from '../../api';
import {Button} from 'react-bootstrap';
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

    handleClick(event, eventParams, festival) {
        event.preventDefault();
        AttendingEvent.create({
            event_id: eventParams.event_id,
            day_id: [festival.start, eventParams.id]
        }).then(res => {
            this.props.history.push(`/itineraries/${this.props.match.params.id}`)
        })
    }

    render() {
        if (this.state.events) {
            return <main>
                <h1>{this.state.events.name}</h1>
                <h5>{this.state.events.description}</h5>
                <p>{this.state.events.address}</p>
                <p>Starts: {DateTime.fromISO(this.state.events.start, {zone: 'utc'}).toFormat("LLL dd yyyy 'at' HH ':' mm")}</p>
                <p>Ends: {DateTime.fromISO(this.state.events.end, {zone: 'utc'}).toFormat("LLL dd yyyy 'at' HH ':' mm")}</p>
                <p>Category: {this.state.events.labels}</p>
                <Button onClick={(e, id, festival) => this.handleClick(e, this.props.match.params, this.state.events)}>Add</Button>
            </main>
        } else {
            return <main></main>
        }
    }
}