import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {firebaseConnect, firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {compose} from "redux";
import uuid from "uuid";

class OneDiet extends Component {


    render() {
        const {name, foods, id, diet, firebase, whole} = this.props

       const x = {...whole, name: 'elo'}
        console.log(x)
        // firebase.updateProfile({diet: {[id]: x }})

        return (

            <div className="diet-container" >
                <div style={{width: '100%', display: 'flex', justifyContent:'center'}}><span className="diet-name">{this.props.name}</span></div>
                <ol className="food-list">{foods.map((el,i)=> <li key={i}><span>{el.food}</span></li>)}</ol>
                <div style={{width: '100%', display: 'flex', justifyContent:'center'}}>
                    <span className="food-calories">
                    {this.props.totalCalories} Calories
                    </span></div>

            </div>
        );
    }
}
OneDiet.propTypes = {
    name: PropTypes.string.isRequired,
}
export default compose(firestoreConnect(), firebaseConnect(),
    connect((state) => ({
        diet: state.firebase.profile.diet,
        profile: state.firebase.profile,

    })))(OneDiet);
