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
    }
    sendData = (e) =>{
        e.preventDefault()
        const {firebase} = this.props
        const {age, weight, height, displayName} = this.state
        const basicData = {
            age,
            weight,
            height,
            displayName,
        }
        firebase.updateProfile({ basicInfo: basicData })

    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        const {age, weight, height, displayName} = this.state
        return (


            <div className="formContainer">
              <div className="col5">
                <form onSubmit={this.sendData}>
                    <div className="row">
                        <div className="col3">
                            <div className="input-container">
                                <div className='checkbox-container'>
                                    <span className="gender">Woman</span>
                                    <input type="checkbox"/>
                                </div>
                                <input onChange={this.onChange} value={weight} type="text" name='weight' placeholder="Weight"/>

                                <input onChange={this.onChange} value={age} type="text" name='age' placeholder="Age"/>
                            </div>


                        </div>
                        <div className="col3">
                            <div className="input-container">
                                <div className='checkbox-container'>
                                <span className="gender">Men</span>
                                <input type="checkbox"/>
                                </div>
                                <input onChange={this.onChange} value={height} name='height' type="text" placeholder="Height"/>
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
    })))(Profile);
