import React from 'react';
import DaysDetails from '../DaysDetails';
import PlaceList from '../PlaceList';
import MapContainer from '../MapContainer';
import EventList from '../EventList'

export default function DaysList(props) {
    const {days, onDelete, onSearch, itinerary_id, this_props} = props;

    if (!days) {
        return(<div></div>)
    } else {
        return(
            <main className="table">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Places to Visit</th>
                        </tr>
                    </thead>
                    <tbody>
                    {days.map(day => {
                        return(
                            <tr key={day.id}>
                                <td><DaysDetails from_date={day.from_date}/></td>
                                <td>
                                    <PlaceList this_props={this_props} places={day.places}/>
                                    <EventList itinerary_id={itinerary_id} events={day.events}/>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <MapContainer days={days} onDeleteClick={onDelete} onSearchClick={onSearch}/>
            </main>
        )    
    }
}