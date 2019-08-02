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
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: params})
        }).then(res => res.json())
    }
}

export const Session = {
    create(params) {
        return fetch(`${BASE_URL}/session`, {
            method: 'POST',
            credentials: 'include',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(res => res.json())
    }
}