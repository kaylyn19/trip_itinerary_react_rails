import React from 'react';
import DaysDetails from '../DaysDetails';
import PlaceList from '../PlaceList';
import MapContainer from '../MapContainer';

export default function DaysList(props) {
    const {days, onDelete, onEdit} = props;

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
                                <td><DaysDetails from_date={day.from_date} to_date={day.to_date}/></td>
                                <td><PlaceList places={day.places} /></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <MapContainer days={days} onDeleteClick={onDelete} onEditClick={onEdit}/>
            </main>
        )    
    }
}