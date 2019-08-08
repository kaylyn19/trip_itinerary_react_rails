import React from 'react';
import {Session} from '../../api';
import {Redirect} from 'react-router-dom'

export default function SignInPage(props) {
    const {onSignIn} = props;

    function handlerSubmit(event) {
        event.preventDefault();
        const {currentTarget} = event;
        const formData = new FormData(currentTarget)
        Session.create({
            email: formData.get('email'),
            password: formData.get('password')
        }).then(res => {
            if (res.id) {
                onSignIn();
                props.history.push('/')
            }
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