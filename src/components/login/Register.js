import React, {Component} from 'react';
import Gym from '../../gym.jpg'
import { firebaseConnect} from 'react-redux-firebase'
import {Link} from "react-router-dom"

class Register extends Component {
    state = {
        email:'',
        password: '',
        error: "",
    }
    register = (e) =>{
        e.preventDefault()
        const {email, password} = this.state
        const {firebase} = this.props
        firebase.createUser({
            email,
            password,
        }).catch((error)=>{
            this.setState({error: error.message})
        })
    }

    onChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    render() {
        const {error} = this.state
        return (
            <div className='main-login'>
                <div className="col4">
                    <div className="formContainer" >
                        <form className="form" onSubmit={this.register} style={{display: 'flex' ,flexDirection: 'column'}}>
                            <input type='email' onChange={this.onChange} name='email' placeholder='Email'/>
                            <input type="password" onChange={this.onChange} name="password" placeholder='Password'/>
                            <input type="submit" value="Register"/>
                        </form>
                        <span className="error-message">{error}</span>
                        <span className="main-login-register-message">You  have a account already?</span>
                        <Link to="/login" style={{color: "#FF4136"}}>Login here</Link>

                    </div>
                </div>
            </div>

        );
    }
}

export default (firebaseConnect())(Register)