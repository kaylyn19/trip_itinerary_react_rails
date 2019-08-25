import React, {Component} from 'react';
import {Festival, Itinerary} from '../../api';
import {DateTime} from 'luxon';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Event} from '../../api'

export default class EventsList extends Component {
    constructor(props) {
        console.log(props)
        super(props)
        this.state = {
            events: {}
        }

    }

    componentDidMount() {
        // const {city, start, end} = this.props;
        const {startLoading, stopLoading} = this.props;
        // startLoading();
        // Festival.all().then(list => {
        //     stopLoading();
        //     this.setState({
        //         events: list
        //     })
        // })
        Itinerary.show(this.props.match.params.id).then(res => {
            Festival.all(res.start, res.end).then(event => {
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
                            <h5>{result.description}</h5>
                            <p>Starts: {DateTime.fromISO(result.start, {zone: 'utc'}).toFormat("LLL dd yyyy 'at' HH ':' mm")}</p> 
                            <p>Ends: {DateTime.fromISO(result.end, {zone: 'utc'}).toFormat("LLL dd yyyy 'at' HH ':' mm")}</p>
                            <p>Category: {result.labels.join(' ')}</p>
                        </div>
                    })
                }
                </ul>
            </main>
        } else {
            return <main><h1>There are events during your visit</h1></main>
        }
    }
}