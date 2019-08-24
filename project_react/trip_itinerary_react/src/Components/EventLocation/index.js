import React from 'react';
import {Place} from '../../api'

export default function EventLocation(props) {
    const {location, title} = props;
    Place.create({
        name: title,
        latitude: location[0],
        longitude: location[1]
    })
    return <p></p>
}