import React, {Component} from 'react';
import {Event} from '../../api';
import {Badge} from 'react-bootstrap';

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

    render() {
        if (this.state.events) {
            return <main>
                <h1>{this.state.events.name}</h1>
                <p>{this.state.events.description}</p>
                <p>{this.state.events.address}</p>
                <p>{this.state.events.start}</p>
                <p>{this.state.events.end}</p>
                <p>{this.state.events.labels}</p>
            </main>
        } else {
            return <main></main>
        }
    }
}