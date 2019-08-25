import React, {Component} from 'react';
import {Festival} from '../../api';
import {DateTime} from 'luxon';
import {Button} from 'react-bootstrap';
import ItineraryEditPage from '../ItineraryEditPage';
import {Link} from 'react-router-dom';
import {Event} from '../../api'

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
        Festival.all().then(list => {
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

    handleClick(event, festival) {
        event.preventDefault();
        const {startLoading, stopLoading} = this.props;
        startLoading();
        Event.create({
            name: festival.title,
            latitude: festival.location[1],
            longitude: festival.location[0],
            labels: festival.labels.join(' '),
            start: festival.start,
            end: festival.end
        }).then(data => {
            stopLoading()
            this.props.history.push({
                pathname: `/itineraries/${this.props.match.params.id}/events/${data.id}`,
                state: {detail: data}
            })
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
                            <h3><Link to="#" onClick={(e, festival) => this.handleClick(e, result)}>{result.title}</Link></h3>
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