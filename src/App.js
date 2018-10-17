import React, { Component } from 'react';
import logo from './logo.svg';
import Navbar from './components/layout/Navbar'
import Profile from './components/profile/Profile'
import UserProfile from './components/profile/UserProfile'
import MyDiet from './components/mydiet/MyDiet'
import WorkoutPlan from './components/workoutplan/WorkoutPlan'
import Login from './components/login/Login'
import './style/Main.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
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

                    <Route component={UserIsAuthenticated(Profile)} exact path="/profile"/>
                    <Route component={UserIsAuthenticated(UserProfile)} exact path="/userprofile"/>
                    <Route component={UserIsAuthenticated(MyDiet)} exact path="/diet"/>
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
