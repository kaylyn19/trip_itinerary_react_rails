import React from 'react';

export default function PlaceDetails(props) {
    const {place, this_props} = props;
    function handleClick(event) {
        event.preventDefault();
        this_props.history.push({
            pathname: `/itineraries/${this_props.match.params.id}/nearby_places`,
            state: {name: event.target.innerHTML}
        })
    }

    return(
        <div>
            <p className="placedetails" id="place" onClick={handleClick}>{place}</p>
        </div>
    )
}