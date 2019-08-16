import React, {Component} from 'react';
import { Itinerary } from '../../api';

export default class ItineraryEditPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itinerary: null
        }
    }

    componentDidMount() {
        Itinerary.show(this.props.match.params.id).then(data => {
            this.setState({
                itinerary: data
            })
        })
    }

    addPlace(event) {
        event.preventDefault()
        this.setState({
            itinerary: {
                ...this.state.itinerary,
                places: [...this.state.itinerary.days.places, ""]
            }
        })
    }

    removePlace(index) {
        index.preventDefault();
        this.state.itinerary.places.splice(index, 1);
        this.setState({
            itinerary: {
                ...this.state.itinerary,
                places: this.state.itinerary.places
            }
        })

    }

    handleSubmit(event) {
        const {startLoading, stopLoading} = this.props;
        event.preventDefault();
        startLoading();
        Itinerary.create(this.state.itinerary).then(trip => {
            stopLoading();
            if (!trip.id) {
                this.setState({ errors: trip.errors })
            } else {
                this.props.history.push(`/itineraries/${trip.id}`)
            }
        })
    }

    handleChange(event) {
        event.preventDefault()
        const newData = {[event.target.name]: event.target.value}
        this.setState({
            itinerary: {
                ...this.state.itinerary,
                ...newData
            }
        })
    }

    handlePlaceChange(event, index) {
        event.preventDefault();
        const inputValue = event.target.value;
        let newPlaces = [...this.state.itinerary.places] //copy places array
        newPlaces[index] = inputValue; // update changed place
        this.setState({
            itinerary: {
                ...this.state.itinerary,
                places: newPlaces,
            }
        })
    }

    render() { 
        return this.state.itinerary &&
        <main className='page'>
        <form onSubmit={this.handleSubmit} className="container card card-body col-12 col-md-4 col-lg-4 create-itinerary">
           
            <h4 className="itinerary-title">Create your Itinerary</h4>  
            <div>
                <label>Name of your Trip</label>
                <input type='text' name='name' value={this.state.itinerary.name} onChange={this.handleChange} className="col-md-6 offset-3 mb-2 form-control"/>
            </div>
            <div >
                <label>From</label>
                <input type='text' name='start' className="from" placeholder='YYYY-MM-DD' value={this.state.itinerary.start} onChange={this.handleChange} className="col-md-6 offset-3 mb-2 form-control"/>
            </div>
            <div>
                <label>To</label>
                <input type='text' name='end' className="to" placeholder='YYYY-MM-DD' value={this.state.itinerary.end} onChange={this.handleChange} className="col-md-6 offset-3 mb-2 form-control"/>
            </div>
            <div>
                <label >Enter places you want to visit: </label>
                { 
                    this.state.itinerary.days.map((each_day) => {
                        return each_day.places.map((place, index) => {
                            return(
                                <div key={index}>
                                    <input value={place.name} type='text' name='name' onChange={e => this.handlePlaceChange(e, index)} className="col-md-6 mb-4 form-control"/>
                                    <button onClick={e => this.removePlace(e)} className="btn btn-danger small mb-4">-</button>
                                </div>
                            )
                        })
                    })
                }
            </div>
            <div className="createbtn">
                <button onClick={e => this.addPlace(e)} className="btn btn-primary small mb-2">Add</button>
                <input type='submit' value='Create Itinerary' className="btn btn-success small"/>
            </div>
        </form>
    </main>

    }
}