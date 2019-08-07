import React from 'react';

export default function ItineraryDetails(props) {
    const { name, start, end } = props;

    return (
        <div>
            <h1>{name}</h1>
            <p>Duration of your trip: from {start} to {end}</p>
        </div>
    )
}