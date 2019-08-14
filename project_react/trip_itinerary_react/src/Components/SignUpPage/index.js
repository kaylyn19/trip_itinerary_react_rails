import React from 'react';
import {User} from '../../api';
import App from '../../App.css';

export default function SignUpPage(props) {
    const {onSignUp} = props;
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
            if (res.id) {
                onSignUp();
                props.history.push('/')
            }
        })
    }
    
    return <main className="page signup-page">
        <form onSubmit={handleSubmit} className="container card card-body col-8 col-md-4 col-lg-4 signup-form">
            <i class="fa fa-user-plus avatar"></i>
            <h4 className="signup-title">Sign up</h4>     
            <div>
                <input type="text" name="first_name" placeholder="First name" className="col-md-10 offset-1 mb-3 form-control"/>
            </div>
            <div>
                <input type="text" name="last_name" placeholder="Last name" className="col-md-10 offset-1 mb-3 form-control"/>
            </div>
            <div>
                <input type="email" name="email" placeholder="Email" className="col-md-10 offset-1 mb-3 form-control"/>
            </div>
            <div>
                <input type="password" name="password" placeholder="Password" className="col-md-10 offset-1 mb-3 form-control"/>
            </div>
            <div>
                <input type="password" name="password_confirmation" placeholder="Confirm Password" className="col-md-10 offset-1 mb-3 form-control"/>
            </div>
            <input type="submit" value="Sign Up" className="btn btn-success col-8 col-md-3 mt-3 offset-4"/>
            <div class="text-center already">Already have an account? <a href="#">Login here</a></div>
        </form> 
    </main>
}