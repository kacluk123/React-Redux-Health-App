import React, {Component} from 'react';
import { firebaseConnect} from 'react-redux-firebase'
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
class Profile extends Component {
    state = {
        age: '',
        weight: '',
        height:'',
        displayName:'',
        gender: '',
        displayAvatar: '',
        errors: {},
    }

    handleChange =(event)=> {
        this.setState({
            gender: event.target.value
        });
    }



    sendData = (e) =>{
        e.preventDefault()
        const {firebase, history} = this.props
        const {age, weight, height, displayName, gender, displayAvatar} = this.state
        const heightSquare = Number(height * 0.01) * Number(height * 0.01);
        const basicData = {
            profileAge: age,
            profileGender: gender,
            profileWeight: weight,
            profileHeight: height,
            profileDisplayAvatar: displayAvatar,
            profileDisplayName: displayName,
            profileBmi: (Number(weight) / heightSquare).toFixed(1),
            profileProteins: 1.5 * Number(weight),
            profileFats: 1.2 * Number(weight),
            profileCarbs: 3 * Number(weight),
            caloriesNeed: gender === 'man' ? (9.99 * Number(weight)) + (6.25 * Number(height))
                - (4.92 * Number(age)) + 5 : (9.99 * Number(weight)) + (6.25 * Number(height))
                - (4.92 * Number(age)) - 161,
        }

        if(age === ''){
            this.setState({errors: {age: 'Age is required!'  }})
        }
        else if(weight === ''){
            this.setState({errors: {weight: 'Weight is required!'  }})
        }
        else if(height === ''){
            this.setState({errors: {height: 'Height is required!'  }})
        }
        else if(displayName === '' || displayName.length < 4 || displayName.length > 10 ){
            this.setState({errors: {displayName: 'Name is required, and it need to be between 4 and 10 characters!'  }})
        }
        else if(gender === ""){
            this.setState({errors: {genderErr: "You must select woman or man!"}})
        } else {
            firebase.updateProfile({ basicInfo: basicData, info: true})
        }
        }
        onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    render() {

        const {age, weight, height, displayName, displayAvatar, errors} = this.state;
                return (
                        <div className="formContainer">
                            <div className="col5">
                                <form onSubmit={this.sendData}>
                                    <div className="row">

                                        <div className="col3">
                                            <div className="input-container">
                                                <div className='checkbox-container'>
                                                    <span className="gender">Woman</span>
                                                    <input value="woman"  onChange={this.handleChange} checked={this.state.gender === 'woman'} type="radio"/>
                                                </div>
                                                <input onChange={this.onChange} value={weight}  type="number" name='weight'
                                                       placeholder='Weight'/>

                                                <input onChange={this.onChange} value={age} type="number" name='age' placeholder="Age"/>
                                            </div>


                                        </div>
                                        <div className="col3">
                                            <div className="input-container">
                                                <div className='checkbox-container'>
                                                    <span className="gender">Men</span>
                                                    <input value="man" onChange={this.handleChange} checked={this.state.gender === "man"} type="radio"/>
                                                </div>


                                                <input onChange={this.onChange} value={height} name='height' type="number" placeholder="Height"/>
                                                <input onChange={this.onChange} value={displayName} name='displayName' type="text" placeholder="Display name"/>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row">

                                        <div className="send-data">
                                            <div style={{width: '77%'}}className="input-container">
                                                <input  onChange={this.onChange} value={displayAvatar} name='displayAvatar' type="text" placeholder="Avatar url"/>
                                            </div>
                                        </div>

                                    </div>



                                    <div className="row">

                                        <div className="send-data">
                                            <input  type='submit' value="Submit"/>

                                        </div>

                                    </div>
                                    <div className="row">
                                        <span style={{color: "#FF4136"}}>{Object.values(errors)}</span>
                                    </div>
                                </form>
                            </div>
                        </div>

                    );
                }
}
Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}
export default compose(firestoreConnect(), firebaseConnect(),
    connect((state,props) =>({
        info: state.firebase.profile.info,
        profile: state.firebase.profile.basicInfo,
    })))(Profile);
