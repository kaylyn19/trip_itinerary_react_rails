import React from 'react';
import {Session} from '../../api'

export default function SignInPage() {
    function handlerSubmit(event) {
        event.preventDefault();
        const {currentTarget} = event;
        console.log(currentTarget)
        const formData = new FormData(currentTarget)
        console.log(formData.get('email'))
        Session.create({
            email: formData.get('email'),
            password: formData.get('password')
        })
    }
    return(
        <main classNmae="page">
            <h1>Sign In</h1>
            <form onSubmit={handlerSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input name="email" type="email"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password"/>
                </div>
                <input type="submit" value="Sign In"/>
            </form>
        </main>
    )
}