import React from 'react';

export default function DaysDetails(props) {
    const {from_date, to_date} = props;
    return(
        <div>
            <p>{from_date}</p>
            <p>{to_date}</p>
        </div>
    )
}