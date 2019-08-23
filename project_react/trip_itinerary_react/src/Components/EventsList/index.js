import React, {Component} from 'react';
import {Event} from '../../api';

export default class EventsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: []
        }
    }

    componentDidMount() {
        const {city, start, end} = this.props
        Event.all(city, start, end).then(list => {
            this.setState({
                events: list
            })
        })
    }

    render() {
        return <main>

        </main>
    }
}