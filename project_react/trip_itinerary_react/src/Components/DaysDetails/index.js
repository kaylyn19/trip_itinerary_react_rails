import React from 'react';
import {DateTime} from 'luxon';

export default function DaysDetails(props) {
    const {from_date, to_date} = props;
    return(
        <div>
            <p>From: {DateTime.fromISO(from_date, {zone: 'utc'}).toFormat('LLL dd yyyy')}</p>
            <p>To: {DateTime.fromISO(to_date, {zone: 'utc'}).toFormat('LLL dd yyyy')}</p>
        </div>
    )
}