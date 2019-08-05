import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import WelcomePage from '../WelcomePage'
import SignUpPage from '../SignUpPage'
import SignInPage from '../SignInPage'
import { User } from '../../api';
import AuthRoute from '../AuthRoute';
import PlanItineraryPage from '../PlanItineraryPage';
import NavBar from '../NavBar'

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
            console.log(user)
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
                    <NavBar/>
                    <Switch>
                        <Route exact path='/sign_up' render={(routeProps) => <SignUpPage onSignUp={this.getCurrentUser} {...routeProps}/>} />
                        <Route  path='/sign_in' component={SignInPage}/>
                        <AuthRoute path='/itineraries/new' isAuthenticated={this.state.currentUser} component={PlanItineraryPage}/>
                        <Route exact path='/' component={WelcomePage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}