import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import WelcomePage from '../WelcomePage'
import SignUpPage from '../SignUpPage'
import SignInPage from '../SignInPage'
import { User } from '../../api';
import AuthRoute from '../AuthRoute';
import PlanItineraryPage from '../PlanItineraryPage';
import NavBar from '../NavBar'
import ItineraryShowPage from '../ItineraryShowPage';
import MyItineraries from '../MyItineraries';


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

    signOut = () => {
        this.setState({
            currentUser: null
        })
    }

    render() {
        return(
            <BrowserRouter>
                <div>
                    <NavBar currentUser={this.state.currentUser} onSignOut={this.signOut} />
                    <Switch>
                        <Route exact path='/sign_up' render={(routeProps) => <SignUpPage onSignUp={this.getCurrentUser} {...routeProps}/>} />
                        <Route  path='/sign_in' render={(routeProps) => (<SignInPage {...routeProps} onSignIn={this.getCurrentUser}/>)} />
                        <AuthRoute exact path='/itineraries/new' isAuthenticated={this.state.currentUser} component={PlanItineraryPage}/>
                        <Route exact path='/itineraries/:id' component={ItineraryShowPage}/>
                        <Route path='/my_itineraries' component={MyItineraries} currentUser={this.state.currentUser}/>
                        <Route exact path='/' component={WelcomePage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )

    }
}