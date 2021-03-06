const BASE_URL = 'http://localhost:3000/api/v1';
require('dotenv').config();
const API_KEY = process.env.REACT_APP_PREDICT_HQ_ACCESS_TOKEN;

export const User = {
    current() {
        return fetch(`${BASE_URL}/users/current`, {
            method: 'GET',
            credentials: 'include'
        }).then(res => res.json())
    },
    create(params) {
        return fetch(`${BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: params})
        }).then(res => res.json())
    },
    show(id) {
        return fetch(`${BASE_URL}/users/${id}/user_itinerary`, {
            credentials: 'include'
        }).then(res => res.json())
    }
}

export const Session = {
    create(params) {
        return fetch(`${BASE_URL}/session`, {
            method: 'POST',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(res => {
            return res.json()
        })
    },
    destroy() {
        return fetch(`${BASE_URL}/session`, {
            method: 'DELETE',
            credentials: 'include'
        }).then(res => res.json())
    }
}

export const Itinerary = {
    create(params) {
        return fetch(`${BASE_URL}/itineraries`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({itinerary: params})
        }).then(res => res.json())
    },
    show(id) {
        return fetch(`${BASE_URL}/itineraries/${id}`, {
            credentials: 'include'
        }).then(res => res.json())
    },
    destroy(id) {
        return fetch(`${BASE_URL}/itineraries/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        }).then(res => res.json())
    },
    update(id, params) {
        return fetch(`${BASE_URL}/itineraries/${id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({itinerary: params})
        }).then(res => res.json())
    }
}

export const Event = {
    create(params) {
        return fetch(`${BASE_URL}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({event: params})
        }).then(res => res.json())
    },
    show(id) {
        return fetch(`${BASE_URL}/events/${id}`, {
            method: 'GET',
        }).then(res => res.json())
    },
    destroy(event_id) {
        return fetch(`${BASE_URL}/events/${event_id}`, {
            method: 'DELETE',
            credentials: 'include'
        }).then(res => res.json())
    }
}

export const Festival = {
    all(start_date, end_date) {
        return fetch (`https://api.predicthq.com/v1/events/?q=country=US&active.gte=${start_date}&active.lte=${end_date}&active.tz=America/Los_Angeles`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            }
        }).then(res => res.json())
    }
}

export const AttendingEvent = {
    create(params, event_id) {
        return fetch(`${BASE_URL}/events/${event_id}/attending_events`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({attending_event: params})
        }).then(res => res.json())
    }
}

export const Place = {
    show(place_name) {
        return fetch(`${BASE_URL}/places/${place_name}`).then(res => res.json())
    }
}