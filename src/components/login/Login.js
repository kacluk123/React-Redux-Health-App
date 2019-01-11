import React, {Component} from 'react';
import Gym from '../../gym.jpg'
import { firebaseConnect} from 'react-redux-firebase'
import {Link} from "react-router-dom"
class Login extends Component {
    state = {
        email:'',
        password: '',
        error: "",
    }
    login = (e) =>{
        e.preventDefault()
        const {email, password} = this.state
        const {firebase} = this.props
        firebase.login({
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
                <form className="form" onSubmit={this.login} style={{display: 'flex' ,flexDirection: 'column'}}>
                    <input type='email' onChange={this.onChange} name='email' placeholder='Email'/>
                    <input type="password" onChange={this.onChange} name="password" placeholder='Password'/>
                    <input type="submit" value="Login"/>
                </form>
                <span className="error-message">{error}</span>
                <span className="main-login-register-message">You don't have a account yet?</span>
                <Link to="/register" style={{color: "#FF4136"}}>Register here</Link>
            </div>
                </div>
            </div>

        );
    }
}

export default (firebaseConnect())(Login)
