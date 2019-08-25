import React from 'react';
import EventDetails from '../EventDetails';

export default function EventList(props) {
    const {events} = props;

    return <div>
        <p style={{fontStyle: "italic", fontWeight: "bold"}}>Attending event(s): </p>
        {
            events.map(event => {
                return <EventDetails key={event.id} event={event}/>
            })
        }
    </div>
}