import React, {Component} from 'react';
import {Event} from '../../api';
import {DateTime} from 'luxon';
import {Button} from 'react-bootstrap';
import ItineraryEditPage from '../ItineraryEditPage';
import {Link} from 'react-router-dom';
import {Place} from '../../api'

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

    onRoute(event) {
        event.preventDefault();
        this.props.history.push(`/itineraries/${this.props.match.params.id}/edit`)
    }

    handleClick(event, name, location) {
        event.preventDefault();
        Place.create({
            name: name,
            latitude: location[1],
            longitude: location[0]
        }).then(data => {
            this.props.history.push(`/itineraries/${this.props.match.params.id}/events/${data.id}`)
        })
    }

    render() {
        if (this.state.events.results) {
            return <main>
                <h1>Select Your Event(s)</h1>
                <ul>
                {
                    this.state.events.results.map(result => {
                        return <div key={result.id}>
                            <h3><Link to="#" onClick={(e, name, location) => this.handleClick(e, result.title, result.location)}>{result.title}</Link></h3>
                            <p>{result.description}</p>
                            <p>Start: {DateTime.fromISO(result.start, {zone: 'utc'}).toFormat("LLL dd yyyy 'at' HH ':' mm")} End: {DateTime.fromISO(result.end, {zone: 'utc'}).toFormat("LLL dd yyyy 'at' HH ':' mm")}</p>
                            <p>Category: {result.labels.join(' ')}</p>
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