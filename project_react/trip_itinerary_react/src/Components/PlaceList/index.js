import React from 'react';
import PlaceDetails from '../PlaceDetails'

export default function PlaceList(props){
    const { places } = props

    return(
        <div>
            {places.map(place => {
                return <PlaceDetails key={place.id} place={place.name}/>
            })}
        </div>
    )
}