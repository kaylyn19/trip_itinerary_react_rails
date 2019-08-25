import React from 'react';
import EventDetails from '../EventDetails';

export default function EventList(props) {
    const {events, itinerary_id} = props;

    return <div>
        <p style={{fontStyle: "italic", fontWeight: "bold"}}>Attending event(s): </p>
        {
            events.map(event => {
                return <EventDetails key={event.id} event={event} itinerary_id={itinerary_id}/>
            })
        }
    </div>
}