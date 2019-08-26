import React from 'react';
import {Session} from '../../api';

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
        <main className="page signin-page">   
            <form onSubmit={handlerSubmit} className="container card card-body col-8 col-md-4 col-lg-4 signin-form">
                <i className="fa fa-user avatar"></i>
                <h4 className="login-title">Login to Your Account</h4>        
                <div>
                {/* <label htmlFor="password">Email</label> */}
                    <input name="email" type="email" placeholder="Email"  className="col-md-10 offset-1 mb-4 form-control"/>
                </div>
                <div>
                    {/* <label htmlFor="password">Password</label> */}
                    <input name="password" type="password"  placeholder="Password" className="col-md-10 offset-1 mb-3 form-control"/>
                    <label className="checkbox-inline"><input type="checkbox"/> Remember me</label>
                    <a href="#" className="forgot-link">Forgot Password?</a>
                </div>
                <button type="submit" value="Sign In" className="btn btn-success col-8 col-md-3 mt-3 offset-4"> Sign in</button>
                <div className="text-center already">Don't have an account? <a href="#">Sign up here</a></div>
            </form>
        </main>
    )
}