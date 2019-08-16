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
import ItineraryEditPage from '../ItineraryEditPage'
import Loading from '../Loading'

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from '../../store/reducers';


export default class App extends Component{
    constructor(props) {
        super(props)
        this.state = {
            currentUser: null,
            isLoading: false
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

    startLoading = () => {
        this.setState({ isLoading: true})
    }

    stopLoading = () => {
        this.setState({ isLoading: false})
    }

    render() {
        const store = createStore(rootReducer, composeWithDevTools())
        return(
            <BrowserRouter>
                <Provider store={store}>
                    <div>
                        <NavBar currentUser={this.state.currentUser} onSignOut={this.signOut} />
                        <Loading isLoading={this.state.isLoading}/>
                        <Switch>
                            <Route exact path='/sign_up' render={(routeProps) => <SignUpPage onSignUp={this.getCurrentUser} {...routeProps}/>} />
                            <Route  path='/sign_in' render={(routeProps) => (<SignInPage {...routeProps} onSignIn={this.getCurrentUser}/>)} />
                            <AuthRoute exact path='/itineraries/new' isAuthenticated={true} component={PlanItineraryPage} startLoading={this.startLoading} stopLoading={this.stopLoading} />
                            <Route exact path='/itineraries/:id' render={(routeProps) => <ItineraryShowPage {...routeProps} startLoading={this.startLoading} stopLoading={this.stopLoading}/>} />
                            <Route expact path='/itineraries/:id/edit' component={ItineraryEditPage}/>
                            <Route path='/my_itineraries' render={(routeProps) => <MyItineraries {...routeProps} startLoading={this.startLoading} stopLoading={this.stopLoading}/>}/>
                            <Route exact path='/' component={WelcomePage}/>
                        </Switch>
                    </div>
                </Provider>
            </BrowserRouter>
        )

    }
}