import React, {Component} from 'react';
import {Event} from '../../api';

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

    render() {
        if (this.state.events.results) {
            return <main>
                <h1>Select Your Event(s)</h1>
                <ul>
                {
                    this.state.events.results.map(event => {
                        return <li key={event.id}>{event.title}</li>
                    })
                }
                </ul>
            </main>
        } else {
            return <main></main>
        }
    }
}