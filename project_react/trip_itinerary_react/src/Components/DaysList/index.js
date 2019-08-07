import React from 'react';
import DaysDetails from '../DaysDetails';
import PlaceList from '../PlaceList';
import MapContainer from '../MapContainer'

export default function DaysList(props) {
    const {days} = props;

    if (!days) {
        return(<div></div>)
    } else {
        return(
            <table>
                <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Places to Visit</th>
                    </tr>
                    </thead>
                    <tbody>
                {days.map(day => {
                    return(
                        <tr key={day.id}>
                            <td><DaysDetails from_date={day.from_date}/></td>
                            <td><DaysDetails from_date={day.to_date}/></td>
                            <td><PlaceList places={day.places} /></td>
                        </tr>
                    )
                })}
                    <div><MapContainer days={days}/></div>
                </tbody>
            </table>
        )    
    }
}