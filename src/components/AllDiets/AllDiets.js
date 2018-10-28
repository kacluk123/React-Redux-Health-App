import React, {Component} from 'react';
import {firebaseConnect} from "react-redux-firebase";
import {compose} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import OneDiet from './OneDiet'
import {firestoreConnect} from "react-redux-firebase";

class AllDiets extends Component {
    render() {
        const { diet, profile } = this.props
            console.log(diet)
        if(profile && diet !== undefined){
            return (
                <div className="container">
                    <div className="card">
                        <div>
                            {Object.keys(diet).map((el, i)=> <OneDiet key={i} name={el}/>)}
                        </div>
                    </div>
                </div>
            );
        } else {
            return <span>...Loading</span>
        }
    }
}



export default compose(firestoreConnect(), firebaseConnect(),
    connect((state) => ({
        diet: state.firebase.profile.diet,
        profile: state.firebase.profile,

    })))(AllDiets);
