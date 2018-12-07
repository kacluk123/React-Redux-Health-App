import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {compose} from "redux"
import OneUserDiet from './OneUserDiet'
import UserDietClick from './userDietClick'
import {firebaseConnect, firestoreConnect} from 'react-redux-firebase'
import {sendId} from "../../actions/IDActions";

class UsersDiets extends Component {

    render() {

        const {diets, dietID} = this.props

        return (
            <div className="container">
            <div className="card" style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                {dietID.idDiet.edit ? <UserDietClick dietID={dietID} /> : null}
                {diets !== undefined ? diets.map(el=> <OneUserDiet key={el.id}
                                                                   dietName={el.name}
                                                                   totalCalories={el.totalCalories}
                                                                   description={el.description}
                                                                   profileName={el.profileName}
                                                                   likes={el.likes}
                                                                   profileAvatar={el.profileAvatar}
                                                                   whole={el}
                />) : []}
            </div>
            </div>
        );
    }
}

UsersDiets.propTypes = {};

export default compose(firestoreConnect([{ collection: 'diets', }]),
    connect((state)=>({diets: state.firestore.ordered.diets,
                        dietID: state.idRed,
        profile: state.firebase.profile,
    }), { sendId }))(UsersDiets);
