import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserProfile from './UserProfile'
import Profile from './Profile'
import {connect} from "react-redux";
import {compose} from "redux";
import {firebaseConnect, firestoreConnect} from "react-redux-firebase";

class MainProfile extends Component {


    render() {
        return (this.props.info ? <UserProfile/> : <Profile/>);


    }
}


export default compose(firestoreConnect(), firebaseConnect(),
    connect((state) => ({
        profile: state.firebase.profile.basicInfo,
        info: state.firebase.profile.info,
    })))(MainProfile);
