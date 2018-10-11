import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Navbar extends Component {
    render() {
        return (
            <div className='row'>
            <div className="main-navbar">
                <ul>
                    <li style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>

                        <div style=
                                 {{
                                     width: '100px', height: '100px',
                                     backgroundPosition:"center",
                                     backgroundRepeat: 'no-repeat',
                                     backgroundSize: '135px',
                                     backgroundImage: "url('https://st2.depositphotos.com/8440746/11967/v/950/depositphotos_119670430-stock-illustration-user-icon-man-profile-businessman.jpg')",
                                     borderRadius: '50%',
                                     }}>

                        </div>
                        <span>User</span>

                    </li>
                    <li>Profile</li>
                    <li>Diets</li>
                    <li>Workout</li>
                </ul>
            </div>
            <div className="col9">
                dasasasasasasasasasasasasasdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </div>
            </div>
        );
    }
}



export default Navbar;
