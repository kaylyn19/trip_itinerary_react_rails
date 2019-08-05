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
                // places: []
            },
            places: [],
            errors: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handlePlaceChange = this.handlePlaceChange.bind(this);
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

    addPlace() {
        this.setState({places: [...this.state.places, ""]})
    }

    removePlace(index) {
        this.state.places.splice(index, 1);
        console.log(this.state.places, '$$$$$$$')
        this.setState({places: this.state.places})
    }

    handleSubmit(event) {
        event.preventDefault();
        Itinerary.create(this.state.newTrip).then(data => {
            if (!data.id) {
                this.setState({ errors: data.errors })
            } else {
                console.log('successfully saved!')
                // this.props.history.push(`/itineraries/${data.id}`)
            }
        })
    }

    handlePlaceChange(event, index) {
        event.preventDefault();
        this.state.places[index] = event.target.value;
        console.log(`this.state.places[index] ${this.state.places[index]}`)
        console.log(`event.target.value ${event.target.value}`)
        Itinerary.create(this.state.places).then(place => {
            console.log(place)
            this.setState({places: this.state.places})
        })
        // this.setState({places: this.state.places})
    }

    render() {
        return(
            <main className='page'>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor='trip_name'>Name of your Trip</label>
                        <input type='text' name='trip_name' value={this.state.newTrip.trip_name} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor='start_date'>From</label>
                        <input type='text' name='start_date' placeholder='2019-02-01' value={this.state.newTrip.start} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor='end_date'>To</label>
                        <input type='text' name='end_date' placeholder='2019-02-10' value={this.state.newTrip.end} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor='name'>Enter places you want to visit: </label>
                        {/** <input value={this.state.places} type='text' name='name' onChange={this.handlePlaceChange}/>*/}
                        
                        {
                            this.state.places.map((place, index) => {
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