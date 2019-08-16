import React from 'react';
import ItineraryDetails from '../ItineraryDetails'
import { Itinerary } from '../../api';
import DaysList from '../DaysList';
import ReactWeather from 'react-open-weather';
import 'react-open-weather/lib/css/ReactWeather.css';
require('dotenv').config()
const WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY

export default class ItineraryShowPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            itineraries: {},
        }    
    }

    componentDidMount() {
        const {startLoading, stopLoading} = this.props;
        startLoading();
        Itinerary.show(this.props.match.params.id).then(trip => {
            stopLoading();
            this.setState({itineraries: trip})
        })
    }

    handleDelete(id) {
        if (window.confirm("Are you sure you want to delete this itinerary?")) {
            Itinerary.destroy(this.state.itineraries.id).then((res) => {
                this.props.history.push('/my_itineraries')
            })
        }
    }

    handleEdit(id, params) {
        // Itinerary.edit(this.state.itineraries.id, ).then((res) => {

        // })
    }

    render() {
        if (!this.state.itineraries.id) {
            return(
                <main className="empty-itinerary">
                    <h1 className="empty-itinerary">Itinerary does not exist!</h1>
                </main>
            )
        }

        return(
            <main className="page" style={{display: "flex", flexDirection: "column"}}>
                <ItineraryDetails 
                    name={this.state.itineraries.name}
                    start={this.state.itineraries.start}
                    end={this.state.itineraries.end}
                />
                <div className="container" width="100" height="100">
                    <ReactWeather forecast="5days" apikey={WEATHER_API_KEY} type="city" city={this.state.itineraries.name}/>
                </div>
                <DaysList days={this.state.itineraries.days} onDelete={this.handleDelete.bind(this)} onEdit={this.handleEdit.bind(this)}/>
            </main>
        )
    }
}