import React from 'react';
import {Session} from '../../api'

export default function SignInPage() {
    function handlerSubmit(event) {
        event.preventDefault();
        const {currentTarget} = event;
        const formData = new FormData(currentTarget)
        Session.create({
            email: formData.get('email'),
            password: formData.get('password')
        })
    }
    return(
        <main className='page'>
            <h1>Sign In Page</h1>
            <form onSubmit={handlerSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email"/>>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password"/>>
            </div>
            </form>
        </main>
    )
}