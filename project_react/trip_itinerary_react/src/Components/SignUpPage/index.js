import React from 'react';
import {User} from '../../api'

export default function SignUpPage(props) {
    const {onSignUp} = props;
    console.log(onSignUp)
    function handleSubmit(event) {
        event.preventDefault();
        const {currentTarget} = event;
        const formData = new FormData(currentTarget)
        User.create({
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            email: formData.get('email'),
            password: formData.get('password'),
            password_confirmation: formData.get('password_confirmation')
        }).then(res => {
            onSignUp();
        })
    }
    
    return <main className="page">
        <h1>Sign Up Page</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="first_name">First Name</label>
                <input type="text" name="first_name"/>>
            </div>
            <div>
                <label htmlFor="last_name">Last Name</label>
                <input type="text" name="last_name"/>>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email"/>>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password"/>>
            </div>
            <div>
                <label htmlFor="password_confirmation">Password Confirmation</label>
                <input type="password" name="password_confirmation"/>>
            </div>
            <input type="submit" value="Sign Up"/>>
        </form>
    </main>
}