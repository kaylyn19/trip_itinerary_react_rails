import React, {Component} from 'react';
import {Event} from '../../api'

export default class EventShowPage extends Component {
    constructor(props) {
        console.log(props)
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
        return <main>
            <h1>Event Show Page</h1>
            {
                // this.state.events.map(event => {
                //     return <div key={event.id}>
                //         <h3>{event.title}</h3>{event.title}
                //     </div>
                // })
            }
        </main>
    }
}