import React, {Component} from 'react';
import {Itinerary} from '../../api'

export default class PlanItineraryPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newTrip: {
                name: '',
                start: '',
                end: '',
                places: []
            },
            errors: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handlePlaceChange = this.handlePlaceChange.bind(this);
    }

    addPlace() {
        this.setState({
            newTrip: {
                ...this.state.newTrip,
                places: [...this.state.newTrip.places, ""]
            }
        })
    }

    removePlace(index) {
        this.state.newTrip.places.splice(index, 1);
        this.setState({newTrip: {places: this.state.newTrip.places}})

    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state)
        Itinerary.create(this.state.newTrip).then(trip => {
            if (!trip.id) {
                this.setState({ errors: trip.errors })
            } else {
                console.log('successfully saved!')
                // this.props.history.push(`/itineraries/${trip.id}`)
            }
        })
    }

    handleChange(event) {
        const newData = {[event.target.name]: event.target.value}
        this.setState({
            newTrip: {
                ...this.state.newTrip,
                ...newData
            }
        })
    }

    handlePlaceChange(event, index) {
        event.preventDefault();
        const inputValue = event.target.value;
        let newPlaces = [...this.state.newTrip.places] //copy places array
        newPlaces[index] = inputValue; // update changed place
        this.setState({
            newTrip: {
                ...this.state.newTrip,
                places: newPlaces,
            }
        })
    }

    render() {
        return(
            <main className='page'>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor='name'>Name of your Trip</label>
                        <input type='text' name='name' value={this.state.newTrip.name} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor='start'>From</label>
                        <input type='text' name='start' placeholder='YYYY-MM-DD' value={this.state.newTrip.start} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor='end'>To</label>
                        <input type='text' name='end' placeholder='YYYY-MM-DD' value={this.state.newTrip.end} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor='name'>Enter places you want to visit: </label>
                        {/** <input value={this.state.places} type='text' name='name' onChange={this.handlePlaceChange}/>*/}
                        
                        {
                            this.state.newTrip.places.map((place, index) => {
                                return(
                                    <div key={index}>
                                        <input value={place.name} type='text' name='name' onChange={e => this.handlePlaceChange(e, index)}/>
                                        <button onClick={e => this.removePlace(e)}>-</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button onClick={e => this.addPlace(e)}>+</button>
                    <input type='submit' value='Create Itinerary' />
                </form>
            </main>
        )    
    }
}