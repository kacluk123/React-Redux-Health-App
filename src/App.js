import React, { Component } from 'react';
import logo from './logo.svg';
import Navbar from './components/layout/Navbar'
import MainProfile from './components/profile/MainProfile'
import EditProfile from './components/profile/EditProfile'
import AllDiets from './components/AllDiets/AllDiets'
import EditDiet from './components/AllDiets/EditDiet'
import UsersDiet from './components/usersdiet/usersdiet'
import MyDiet from './components/mydiet/MyDiet'
import WorkoutPlan from './components/workoutplan/WorkoutPlan'
import Login from './components/login/Login'
import Register from './components/login/Register'

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
import {sendId} from "./actions/IDActions";
class App extends Component {
    render() {
        return (
            <Router basename={process.env.PUBLIC_URL}>
                    <div   className={`${this.props.dietID.edit  ? "blackScreen" : ""}`} style={{display: 'flex'}} >
                        <Navbar/>
                        <Switch>
                            <Route component={UserIsAuthenticated(MainProfile)} exact path="/profile"/>
                            <Route component={UserIsAuthenticated(MyDiet)} exact path="/diet"/>
                            <Route component={UserIsAuthenticated(AllDiets)} exact path="/alldiets"/>
                            <Route component={UserIsAuthenticated(EditProfile)} exact path="/editprofile"/>
                            <Route component={UserIsAuthenticated(WorkoutPlan)} exact path="/workout"/>
                            <Route component={UserIsNotAuthenticated(Login)} exact path="/login"/>
                            <Route component={UserIsNotAuthenticated(Register)} exact path="/register"/>
                            <Route component={UserIsAuthenticated(EditDiet)} exact path="/edit/:id"/>
                            <Route component={UserIsAuthenticated(UsersDiet)} exact path="/usersdiet"


                            />

                        </Switch>
                    </div>
                </Router>
        )
    }
}

export default compose(firestoreConnect(), firebaseConnect(),
    connect((state,props) =>({
        info: state.firebase.profile.info,
        profile: state.firebase.profile.basicInfo,
        dietID: state.idRed.idDiet,
    })))(App);
