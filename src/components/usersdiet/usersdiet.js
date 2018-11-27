import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {compose} from "redux"
import {firebaseConnect, firestoreConnect} from 'react-redux-firebase'
class UsersDiets extends Component {
    state = {
        elo : 'eki'
    }
    componentDidMount(){
        console.log(this.props.diets)

    }
    render() {
        return (
            <div>
                elllloooo
            </div>
        );
    }
}

UsersDiets.propTypes = {};

export default compose(firestoreConnect([{ collection: 'diets', orderBy: 'totalCalories', }]),
    connect((state)=>({diets: state.firestore.ordered.diets})))(UsersDiets);
