import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export default function AuthRoute(props) {
    const {isAuthenticated, component: Component, ...authRouteProps} = props
    if (!isAuthenticated) {
        return(<Redirect to='/sign_in'/>)
    } else {
        return <Route  render={(routeProps) => <Component {...authRouteProps} {...routeProps}/>}/>
    }
}