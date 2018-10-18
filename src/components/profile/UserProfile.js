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


    //
    // bmiState = () =>{
    //             let bmi = '';
    //            const {profileBmi} = this.props.profile;
    //            if (profileBmi === 30 || profileBmi > 30){
    //                bmi = `Your bmi is ${profileBmi} and you're obese!`;
    //            } else if(profileBmi > 25 && profileBmi < 30){
    //                bmi = `Your bmi is ${profileBmi} and you're overweight!`;
    //            } else if(profileBmi > 18.5 && profileBmi < 25){
    //                bmi = `Your bmi is ${profileBmi} and you're ok!`;
    //            } else if(profileBmi > 16.5 && profileBmi < 18.49){
    //                bmi =  `Your bmi is ${profileBmi} and you are underweight!`;
    //            } else {
    //                bmi = `Your bmi is ${profileBmi} and you are seriously underweight!`;
    //            }
    //            return bmi;
    //
    //
    // }
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
        const { profileDisplayAvatar, profileDisplayName, profileWeight, profileHeight, profileAge, caloriesNeed} = this.state.data;



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
                            <span>Calories needed to keep weight: {caloriesNeed}</span>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserProfile.propTypes = {
    profile: PropTypes.object.isRequired,
}
export default compose(firestoreConnect(), firebaseConnect(),
    connect((state) =>({

        profile: state.firebase.profile.basicInfo
    })))(UserProfile);
