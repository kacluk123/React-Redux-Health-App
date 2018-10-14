import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect} from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {Link} from 'react-router-dom'
class Navbar extends Component {
    onLogoutClick = (e) => {
        e.preventDefault();
        const {firebase} = this.props;
        firebase.logout();
    }
    render() {
        const { auth } = this.props
        return (

            <div className="main-navbar">
                {auth.uid ? <ul>
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
                        <span style={{fontWeight: "400", color: "white"}}>User</span>
                    </li>
                    <li>
                        <Link to="/profile" className="navbar-links profile-link">
                            <i className="fas fa-user-alt"></i> Profile
                        </Link>
                    </li>
                    <li><Link to="/diet" className="navbar-links diet-link">
                        <i className="fas fa-utensils"></i> Diet
                    </Link></li>
                    <li><Link to="/workout" className="navbar-links workout-link">
                        <i className="fas fa-dumbbell"></i>Workout plan
                    </Link></li>
                    <li onClick={this.onLogoutClick}><span>Logout</span></li>




                </ul> : null}
            </div>


        );
    }
}

export default compose(
    firebaseConnect(),
    connect((state,props) =>({
        auth: state.firebase.auth,
        settings: state.settings
    }))
)(Navbar);