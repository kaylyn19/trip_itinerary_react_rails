import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import WelcomePage from '../WelcomePage'
import SignUpPage from '../SignUpPage'
import { User } from '../../api';

export default class App extends Component{
    constructor(props) {
        super(props)
        this.state = {
            currentUser: null
        }
        this.getCurrentUser = this.getCurrentUser.bind(this)
    }

    getCurrentUser() {
        User.current().then(user => {
            if (user.id) {
                this.setState({ currentUser: user})
            }
        })
    }

    componentDidMount() {
        this.getCurrentUser()
    }

    render() {
        return(
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route to='/' component={WelcomePage}/>
                        <Route to='/sign_up' 
                        render={(routeProps) => <SignUpPage onSignUp={this.getCurrentUser} {...routeProps}/>} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}