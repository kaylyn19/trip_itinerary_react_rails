import React from 'react';
import {DateTime} from 'luxon';

export default function ItineraryDetails(props) {
    const { name, start, end } = props;
    
    return (
        <div>
            <h1>{name}</h1>
            <p>Duration of your trip: from {DateTime.fromISO(start, {zone: 'utc'}).toFormat('LLL dd yyyy')} to {DateTime.fromISO(end, {zone: 'utc'}).toFormat('LLL dd yyyy')}</p>
        </div>
    )
}