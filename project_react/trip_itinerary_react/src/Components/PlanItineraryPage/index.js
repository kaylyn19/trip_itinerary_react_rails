import React from 'react';
import {Itinerary} from '../../api'

export default function PlanItineraryPage() {
    function handlerSubmit(event) {
        event.preventDefault();
        const {currentTarget} = event;
        const formData = new FormData(currentTarget)
        Itinerary.create({
            name: formData.get('trip_name'),
            start: formData.get('start_date'),
            end: formData.get('end'),
            places: formData.get('name')
        })
    }
    return(
        <main className='page'>
            <form onSubmit={handlerSubmit}>
                <div>
                    <label htmlFor='trip_name'>Name of your Trip</label>
                    <input type='text' name='trip_name' />
                </div>
                <div>
                    <label htmlFor='start_date'>From</label>
                    <input type='text' name='start_date' placeholder='2019-02-01'/>
                </div>
                <div>
                    <label htmlFor='end_date'>To</label>
                    <input type='text' name='end_date' placeholder='2019-02-10'/>
                </div>
                <div>
                    <label htmlFor='name'>Enter places you want to visit: </label>
                    <input type='text' name='name' />
                </div>
                <input type='submit' value='Create Itinerary' />
            </form>
        </main>
    )
}