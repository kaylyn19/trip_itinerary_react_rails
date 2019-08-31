import React, {Component} from 'react';
import {Festival, Itinerary} from '../../api';
import {DateTime} from 'luxon';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Event} from '../../api'
import EventShowPage from '../EventShowPage';

export default class EventsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: {}
        }

    }

    componentDidMount() {
        const {startLoading, stopLoading} = this.props;
        startLoading();
        Itinerary.show(this.props.match.params.id).then(res => {
            Festival.all(res.start, res.end).then(event => {
                stopLoading();
                this.setState({
                    events: event
                })
            })
        })
    }

    handleClick(event, festival) {
        event.preventDefault();
        const {startLoading, stopLoading} = this.props;
        startLoading();
        Event.create({
            name: festival.title,
            description: festival.description,
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
            return <div className="festival-list">
            <div>
            <p className="festival-header">Select Your Event(s)</p>
            {
                this.state.events.results.map(result => {
                    return <div key={result.id} className="festivals">
                        <p className="festival-title"><Link to="#" onClick={(e, festival) => this.handleClick(e, result)}>{result.title}</Link></p>
                        <p className="festival-start">Starts: {DateTime.fromISO(result.start, {zone: 'utc'}).toFormat("LLL dd yyyy 'at' HH ':' mm")}</p> 
                        <p className="festival-end">Ends: {DateTime.fromISO(result.end, {zone: 'utc'}).toFormat("LLL dd yyyy 'at' HH ':' mm")}</p>
                        <p className="festival-description">{result.description}</p>
                        <p className="festival-category">Category: {result.labels.join(' ')}</p>
                    </div>
                })
            }
            </div>
        </div>
        } else {
            return <main><h1>There are events during your visit</h1></main>
        }
    }
}