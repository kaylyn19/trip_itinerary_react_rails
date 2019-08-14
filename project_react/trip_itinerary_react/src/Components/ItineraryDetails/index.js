import React from 'react';
import {DateTime} from 'luxon';

export default function ItineraryDetails(props) {
    const { name, start, end } = props;
    
    return (
        <div className="show-container">
            <h1 className="show">{name}</h1>
            <h4 className="show">Duration of your trip: from {DateTime.fromISO(start, {zone: 'utc'}).toFormat('LLL dd yyyy')} to {DateTime.fromISO(end, {zone: 'utc'}).toFormat('LLL dd yyyy')}</h4>
        </div>
    )
}