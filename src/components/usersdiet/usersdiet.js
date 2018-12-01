import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {compose} from "redux"
import OneUserDiet from './OneUserDiet'
import {firebaseConnect, firestoreConnect} from 'react-redux-firebase'
import {sendId} from "../../actions/IDActions";

class UsersDiets extends Component {
    closeWindow =()=>{
        this.props.sendId('')
    }
    render() {
        console.log(this.props.diets)
        const {diets, dietID} = this.props
        console.log(dietID)
        return (
            <div className="container">
            <div className="card" style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                {dietID.idDiet ? <div className="UserDietContainer">
                    <i onClick={this.closeWindow} style={{alignSelf: 'flex-start',marginLeft: 'auto', cursor:'pointer', fontSize: '35px'}}className="fas fa-times"></i>

                    <span className="user-diet-name">{dietID.idDiet.name}</span>
                    <ol>{dietID.idDiet.arr.map(el=>
                        <li style={{fontSize: '20px', color: "#393f4d"}}>{el.food}  <span className="food-calories">Calories: {el.calories}</span> </li>)}</ol>
                    <p style={{fontSize: '20px', color: "#393f4d"}}>{dietID.idDiet.description}</p>


                </div> : null}
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
    }), { sendId }))(UsersDiets);
