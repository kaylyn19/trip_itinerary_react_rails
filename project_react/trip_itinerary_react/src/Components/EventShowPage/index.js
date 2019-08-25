import React, {Component} from 'react';
import {Place} from '../../api'

export default class EventShowPage extends Component {
    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            places: {}
        }
    }

    componentDidMount() {
    }

    render() {
        return <main>Event Show Page
        </main>
    }
}