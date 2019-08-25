import React from 'react';

export default function EventDetails(props) {
    const {event} = props;
    return <div>
        <p style={{fontStyle: "italic"}}>{event.name}</p>
    </div>
}