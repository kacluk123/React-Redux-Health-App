import React, {Component} from 'react';
import Gym from '../../gym.jpg'

class Login extends Component {
    render() {
        return (
            <div className='main-login'>
            <div className="col4">
            <div className="formContainer" >
                <form className="form" style={{display: 'flex' ,flexDirection: 'column'}}>
                    <input type='email' name='email' placeholder='Email'/>
                    <input type="password" name="password"placeholder='Password'/>
                    <input type="submit" value="Login"/>
                </form>

            </div>
                </div>
            </div>

        );
    }
}

export default Login;
