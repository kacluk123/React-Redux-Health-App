import React, {Component} from 'react';
import { firebaseConnect} from 'react-redux-firebase'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class Profile extends Component {
    state = {
        age: '',
        weight: '',
        height:'',
        displayName:'',
        data: {},

    }
    static getDerivedStateFromProps(props,state){
        if(props.profile !== undefined){
            if(props.profile !== state.data){
                return {
                    data: props.profile,
                }
            } else {
                return null;
            }


        }
    }
    sendData = (e) =>{
        e.preventDefault()
        const {firebase} = this.props
        const {age, weight, height, displayName} = this.state
        const heightSquare = Number(height) * Number(height)
        const basicData = {
            profileAge: age,
            profileWeight: weight,
            profileHeight: height,
            profileDisplayName: displayName,
            profileBmi: Number(weight) / heightSquare,
        }
        firebase.updateProfile({ basicInfo: basicData })

    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        console.log(this.state.data)
        const {age, weight, height, displayName} = this.state;

            return (


                <div className="formContainer">
                    <span>{this.state.data.profileWeight}</span>

                    <div className="col5">
                        <form onSubmit={this.sendData}>
                            <div className="row">

                                <div className="col3">
                                    <div className="input-container">
                                        <div className='checkbox-container'>
                                            <span className="gender">Woman</span>
                                            <input type="checkbox"/>
                                        </div>
                                        <input onChange={this.onChange} value={weight} type="number" name='weight'
                                               placeholder='Weight'/>

                                        <input onChange={this.onChange} value={age} type="number" name='age' placeholder="Age"/>
                                    </div>


                                </div>
                                <div className="col3">
                                    <div className="input-container">
                                        <div className='checkbox-container'>
                                            <span className="gender">Men</span>
                                            <input type="checkbox"/>
                                        </div>
                                        <input onChange={this.onChange} value={height} name='height' type="number" placeholder="Height"/>
                                        <input onChange={this.onChange} value={displayName} name='displayName' type="text" placeholder="Display name"/>
                                    </div>

                                </div>
                            </div>
                            <div className="row">

                                <div className="send-data">
                                    <input  type='submit' value="Submit"/>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>

            );


    }
}


export default compose(firestoreConnect(), firebaseConnect(),
    connect((state,props) =>({
        auth: state.firebase.auth,
        profile: state.firebase.profile.basicInfo
    })))(Profile);
