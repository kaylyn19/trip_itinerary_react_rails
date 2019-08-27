import React from 'react';
import PlaceDetails from '../PlaceDetails'

export default function PlaceList(props){
    const { places, this_props } = props

    return(
        <div>
            {places.map(place => {
                return <PlaceDetails this_props={this_props} key={place.id} place={place.name}/>
            })}
        </div>
    )
}