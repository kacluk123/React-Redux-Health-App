import React, {Component} from 'react';
import Gym from '../../gym.jpg'
import { firebaseConnect} from 'react-redux-firebase'

class Login extends Component {
    state = {
        email:'',
        password: '',
    }
    login = (e) =>{
        e.preventDefault()
        const {email, password} = this.state
        const {firebase} = this.props
        firebase.login({
            email,
            password,
        }).catch((error )=>{
            console.log('wrong data')

        })
    }

    onChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    render() {
        return (
            <div className='main-login'>
            <div className="col4">
            <div className="formContainer" >
                <form className="form" onSubmit={this.login} style={{display: 'flex' ,flexDirection: 'column'}}>
                    <input type='email' onChange={this.onChange} name='email' placeholder='Email'/>
                    <input type="password" onChange={this.onChange} name="password" placeholder='Password'/>
                    <input type="submit" value="Login"/>
                </form>

            </div>
                </div>
            </div>

        );
    }
}

export default (firebaseConnect())(Login)
