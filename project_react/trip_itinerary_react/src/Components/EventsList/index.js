import React, {Component} from 'react';
import {Event} from '../../api';

export default class EventsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: {
                results: []
            }
        }
    }

    componentDidMount() {
        const {city, start, end} = this.props;
        Event.all(start, end).then(list => {
            this.setState({
                events: list
            })
        })
    }

    render() {
        return <main>
            <h1>Select Your Events</h1>
            {
                // this.state.events.results.map(event => {
                //     <div>{event.title}</div>
                // })
            }
        </main>
    }
}