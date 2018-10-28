import React, { Component } from 'react';
import logo from './logo.svg';
import Navbar from './components/layout/Navbar'
import MainProfile from './components/profile/MainProfile'
import EditProfile from './components/profile/EditProfile'
import AllDiets from './components/AllDiets/AllDiets'
import MyDiet from './components/mydiet/MyDiet'
import WorkoutPlan from './components/workoutplan/WorkoutPlan'
import Login from './components/login/Login'
import './style/Main.scss'
import {firebaseConnect} from "react-redux-firebase";
import {compose} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';

import {UserIsAuthenticated, UserIsNotAuthenticated} from "./auth";
import store from './store';
class App extends Component {
    render() {
        return (

            <Provider store={store}>
                <Router>
                    <div style={{display: 'flex'}}>
                        <Navbar/>

                        <Switch>

                            <Route component={UserIsAuthenticated(MainProfile)} exact path="/profile"/>
                            <Route component={UserIsAuthenticated(MyDiet)} exact path="/diet"/>
                            <Route component={UserIsAuthenticated(AllDiets)} exact path="/alldiets"/>
                            <Route component={UserIsAuthenticated(EditProfile)} exact path="/editprofile"/>
                            <Route component={UserIsAuthenticated(WorkoutPlan)} exact path="/workout"/>
                            <Route component={UserIsNotAuthenticated(Login)} exact path="/login"/>

                        </Switch>


                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App;