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

    handleClick(event, eventID) {
        event.preventDefault();
        // AttendingEvent.create(
        //     event_id: eventID,
        //     day_id:
        // )
        // day_id: Day.where(start: this.state.events.start)
    }

    render() {
        console.log(DateTime.fromISO(this.state.events.start, {zone: 'utc'}).toFormat("LLL dd yyyy 'at' HH ':' mm"))
        if (this.state.events) {
            return <main>
                <h1>{this.state.events.name}</h1>
                <h5>{this.state.events.description}</h5>
                <p>{this.state.events.address}</p>
                <p>Starts: {DateTime.fromISO(this.state.events.start, {zone: 'utc'}).toFormat("LLL dd yyyy 'at' HH ':' mm")}</p>
                <p>Ends: {DateTime.fromISO(this.state.events.end, {zone: 'utc'}).toFormat("LLL dd yyyy 'at' HH ':' mm")}</p>
                <p>{this.state.events.labels}</p>
                <Button onClick={(e, id) => this.handleClick(e, this.props.match.params.id)}>Add</Button>
            </main>
        } else {
            return <main></main>
        }
    }
}