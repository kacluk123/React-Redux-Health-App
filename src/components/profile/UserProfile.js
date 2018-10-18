import React, {Component} from 'react';
import { firebaseConnect} from 'react-redux-firebase'
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class UserProfile extends Component {

      state = {
            data: {},
        }



    bmiState = () =>{
                let bmi = '';
               const {profileBmi} = this.state.data;
               if (profileBmi === 30 || profileBmi > 30){
                   bmi = `Your bmi is ${profileBmi} and you're obese!`;
               } else if(profileBmi > 25 && profileBmi < 30){
                   bmi = `Your bmi is ${profileBmi} and you're overweight!`;
               } else if(profileBmi > 18.5 && profileBmi < 25){
                   bmi = `Your bmi is ${profileBmi} and you're ok!`;
               } else if(profileBmi > 16.5 && profileBmi < 18.49){
                   bmi =  `Your bmi is ${profileBmi} and you are underweight!`;
               } else {
                   bmi = `Your bmi is ${profileBmi} and you are seriously underweight!`;
               }
               return bmi;


    }
    static getDerivedStateFromProps(props,state){
        if(props.profile){
            if(props.profile !== state.data){
                return {
                    data: props.profile,
                }
            }

        } else {
            return null;
        }
    }

    render() {
        const { profileDisplayAvatar, profileDisplayName, profileWeight,
            profileHeight, profileAge, caloriesNeed, profileProteins, profileFats, profileCarbs,
        } = this.state.data;



        if (this.props.profile){
            return (
                <div className="container">
                    <div className="card">
                        <div className="col10">
                            <div className="image-container">
                                <div style={{backgroundImage: "url("+profileDisplayAvatar+")"}} className="user-profile-avatar"></div>
                                <span className="user-name">{profileDisplayName}</span>
                                <ul className="user-info">
                                    <li><span>Age</span><span className="user-span">{profileAge}</span></li>
                                    <li><span>Weight</span><span className="user-span">{profileWeight} kg</span></li>
                                    <li><span>Height</span><span className="user-span">{profileHeight} cm</span></li>
                                </ul>
                                <span className="user-name">Calories needed to keep weight: <span style={{color:'#FF4136'}}>{caloriesNeed}</span></span>
                                <div style={{marginTop: '45px', textAlign: 'center'}}>
                                    <span className="user-name">Macronutrients per day</span>
                                    <ul style={{border: '2px solid white', borderRadius: '20px'}}className="user-info">
                                        <li><span>Proteins</span><span className="user-macronutrients">{profileProteins} g</span></li>
                                        <li><span>Fats</span><span className="user-macronutrients">{profileFats} g</span></li>
                                        <li><span>Carbs</span><span className="user-macronutrients">{profileCarbs} g</span></li>
                                    </ul>
                                </div>
                            </div>
                            {this.bmiState}
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div>Loading...</div>
        }
    }
}

UserProfile.propTypes = {
    profile: PropTypes.object.isRequired,
}
export default compose(firestoreConnect(), firebaseConnect(),
    connect((state) =>({

        profile: state.firebase.profile.basicInfo
    })))(UserProfile);
