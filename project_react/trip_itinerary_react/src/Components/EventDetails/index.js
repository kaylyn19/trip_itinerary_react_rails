import React from 'react';
import {Link} from 'react-router-dom'

export default function EventDetails(props) {
    const {event, itinerary_id} = props;
    return <div>
        <p style={{fontStyle: "italic"}}><Link to ={`/itineraries/${itinerary_id}/events/${event.id}/display`}>{event.name}</Link></p>
    </div>
}