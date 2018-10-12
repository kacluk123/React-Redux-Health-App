import React, { Component } from 'react';
import logo from './logo.svg';
import Navbar from './components/layout/Navbar'
import Profile from './components/profile/Profile'
import MyDiet from './components/mydiet/MyDiet'
import WorkoutPlan from './components/workoutplan/WorkoutPlan'

import './style/Main.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
            <Router>
                <div style={{display: 'flex'}}>
                <Navbar/>

                <Switch>
                    <Route component={Profile} exact path="/profile"/>
                    <Route component={MyDiet} exact path="/diet"/>
                    <Route component={WorkoutPlan} exact path="/workout"/>

                </Switch>


                </div>
            </Router>
    );
  }
}

export default App;
