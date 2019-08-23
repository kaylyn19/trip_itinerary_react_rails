import React, {Component} from 'react';
import {Itinerary} from '../../api'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    }

    addPlace(event) {
        event.preventDefault()
        this.setState({
            newTrip: {
                ...this.state.newTrip,
                places: [...this.state.newTrip.places, ""]
            }
        })
    }

    removePlace(index) {
        index.preventDefault();
        this.state.newTrip.places.splice(index, 1);
        this.setState({
            newTrip: {
                ...this.state.newTrip,
                places: this.state.newTrip.places
            }
        })

    }

    handleSubmit(event) {
        const {startLoading, stopLoading} = this.props;
        event.preventDefault();
        startLoading();
        Itinerary.create(this.state.newTrip).then(trip => {
            stopLoading();
            if (!trip.id) {
                this.setState({ errors: trip.errors })
            } else {
                this.props.history.push(`/itineraries/${trip.id}`)
            }
        })
    }

    handleChange(event) {
        event.preventDefault();
        // const newData = {[event.target.name]: event.target.value}
        this.setState({
            newTrip: {
                ...this.state.newTrip,
                name: event.target.value
            }
        })
    }

    handleDateChange(date, label) {
        console.log('date is', date, 'label is ', label)
        const newData = {[label]: date}
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
                <form onSubmit={this.handleSubmit} className="container card card-body col-12 col-md-4 col-lg-4 create-itinerary">
                   
                <h4 className="itinerary-title">Create your Itinerary</h4>  
                    <div>
                        <label htmlFor='name' className="tripname">Your Destination</label>
                        <input type='text' name='name' value={this.state.newTrip.name} placeholder='Destination' onChange={this.handleChange} className="col-md-6 offset-3 mb-2 form-control"/>
                    </div>
                    <div >
                        <label htmlFor='start' className="from">From</label>
                        <DatePicker name='start' className='from' selected={this.state.newTrip.start} onChange={(date, label) => this.handleDateChange(date, 'start')}  value={this.state.newTrip.start} className="col-md-6 offset-3 mb-2 form-control"/>
                        {/* <input type='text' name='start' className="from" placeholder='YYYY-MM-DD' value={this.state.newTrip.start} onChange={this.handleChange} className="col-md-6 offset-3 mb-2 form-control"/> */}
                    </div>
                    <div>
                        <label htmlFor='end' className="to">To</label>
                        <DatePicker name='end' className='to' selected={this.state.newTrip.end} onChange={(date, label) => this.handleDateChange(date, 'end')} value={this.state.newTrip.end} className="col-md-6 offset-3 mb-2 form-control"/>
                        {/* <input type='text' name='end' className="to" placeholder='YYYY-MM-DD' value={this.state.newTrip.end} onChange={this.handleChange} className="col-md-6 offset-3 mb-2 form-control"/> */}
                    </div>
                    <div>
                        <label htmlFor='name' className="placename">Enter places you want to visit: </label>
                        {/** <input value={this.state.places} type='text' name='name' onChange={this.handlePlaceChange}/>*/}
                        
                        {
                            this.state.newTrip.places.map((place, index) => {
                                return(
                                    <div key={index} className="delete">
                                        <input value={place.name} type='text' name='name' onChange={e => this.handlePlaceChange(e, index)} className="col-md-6 mb-4 form-control"/>
                                        <button onClick={e => this.removePlace(e)} className="btn btn-danger small mb-4">-</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="createbtn">
                    <button onClick={e => this.addPlace(e)} className="btn btn-primary small mb-2">Add</button>
                    <input type='submit' value='Create Itinerary' className="btn btn-success small"/>
                    </div>
                </form>
            </main>

        )    
    }
}