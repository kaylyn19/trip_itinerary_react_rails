import React from 'react';
import {DateTime} from 'luxon';

export default function DaysDetails(props) {
    const {from_date, to_date} = props;
    return(
        <div class="date">
            <p class="from-date">{DateTime.fromISO(from_date, {zone: 'utc'}).toFormat('LLL dd yyyy')}</p>
            <p>~</p>
            <p class="to date">{DateTime.fromISO(to_date, {zone: 'utc'}).toFormat('LLL dd yyyy')}</p>
        </div>
    )
}