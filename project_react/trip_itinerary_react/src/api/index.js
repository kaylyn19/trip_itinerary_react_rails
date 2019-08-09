const BASE_URL = 'http://localhost:3000/api/v1'

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
        console.log(params)
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
    }
}