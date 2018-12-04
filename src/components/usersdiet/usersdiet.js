import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {compose} from "redux"
import OneUserDiet from './OneUserDiet'
import {firebaseConnect, firestoreConnect} from 'react-redux-firebase'
import {sendId} from "../../actions/IDActions";

class UsersDiets extends Component {
    likeDiet = (diet) =>{
        const newArr = [...diet.likes, this.props.profile.basicInfo.profileDisplayName ]
        const updateLikes = {...diet, likes: newArr}
        this.props.firestore.update({ collection: 'diets', doc: `${diet.id}`,}, updateLikes )
        this.forceUpdate()
    }

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
                {dietID.idDiet ?
                    <div className="UserDietContainer">
                    <i onClick={this.closeWindow} style={{alignSelf: 'flex-start',marginLeft: 'auto', cursor:'pointer', fontSize: '35px'}}className="fas fa-times"></i>

                    <span className="user-diet-name">{dietID.idDiet.name}</span>
                    <ol>{dietID.idDiet.arr.map(el=>
                        <li style={{fontSize: '20px', color: "#393f4d"}}>{el.food}  <span className="food-calories">Calories: {el.calories}</span> </li>)}</ol>
                    <p style={{fontSize: '20px', color: "#393f4d"}}>{dietID.idDiet.description}</p>
                        <span>Added by: <span style={{fontWeight: '500', fontFamily: 'open Sans'}}>{dietID.idDiet.profileName}</span></span>
                        <div style={{
                                     width: '100px', height: '100px',
                                     backgroundPosition:"center",
                                     backgroundRepeat: 'no-repeat',
                                     backgroundSize: '110px',
                                     backgroundImage: `url(${dietID.idDiet.profileAvatar})`,
                                     borderRadius: '50%',
                                 }}></div>
                        <div style={{display: 'flex', paddingTop: '20px'}}> <span className="food-calories">Likes: {dietID.idDiet.likes.length > 0 ? dietID.idDiet.likes.length : 0 }</span>
                            <i className="far fa-thumbs-up user-diet-like" onClick={this.likeDiet.bind(this, dietID.idDiet)}></i></div>


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
        profile: state.firebase.profile,
    }), { sendId }))(UsersDiets);
