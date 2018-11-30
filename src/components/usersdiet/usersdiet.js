import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {compose} from "redux"
import OneUserDiet from './OneUserDiet'
import {firebaseConnect, firestoreConnect} from 'react-redux-firebase'
class UsersDiets extends Component {
    state = {
        elo : 'eki',
        obj : {},
    }
     componentDidMount(){
         console.log(this.props.diets)

    }
    render() {
        const {diets} = this.props
        return (
            <div className="container">
            <div className="card" style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                {diets !== undefined ? diets.map(el=> <OneUserDiet key={el.id}
                                                                   dietName={el.name}
                                                                   totalCalories={el.totalCalories}

                />) : []}
            </div>
            </div>
        );
    }
}

UsersDiets.propTypes = {};

export default compose(firestoreConnect([{ collection: 'diets', }]),
    connect((state)=>({diets: state.firestore.ordered.diets})))(UsersDiets);
