import React, {Component} from 'react';
import {Event} from '../../api';
import {DateTime} from 'luxon';
import {Button} from 'react-bootstrap';
import EventLocation from '../EventLocation'


export default class EventsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: {}
        }
    }

    componentDidMount() {
        // const {city, start, end} = this.props;
        const {startLoading, stopLoading} = this.props;
        startLoading();
        Event.all().then(list => {
            stopLoading();
            this.setState({
                events: list
            })
        })
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        if (this.state.events.results) {
            return <main>
                <h1>Select Your Event(s)</h1>
                <ul>
                {
                    this.state.events.results.map(event => {
                        return <div key={event.id}>
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <EventLocation title={event.title} location={event.location}/>
                            <p>{event.location}</p>
                            <p>Start: {DateTime.fromISO(event.start, {zone: 'utc'}).toFormat('LLL dd yyyy')} End: {DateTime.fromISO(event.end, {zone: 'utc'}).toFormat('LLL dd yyyy')}</p>
                            <p>Category: {event.labels.join(' ')}</p>
                            <Button variant="success" onSubmit={this.handleSubmit}>Add</Button>
                        </div>
                    })
                }
                </ul>
            </main>
        } else {
            return <main></main>
        }
    }
}