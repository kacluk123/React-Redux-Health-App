import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect} from 'react-redux-firebase'
import { connect } from 'react-redux'
import Loader from "./Loader"
import { compose } from 'redux'
import {Link} from 'react-router-dom'
class Navbar extends Component {
    onLogoutClick = (e) => {
        e.preventDefault();
        const {firebase} = this.props;
        firebase.logout();
    }
    render() {
        const { profile, profileInfo } = this.props
        console.log(profileInfo)


        if(profile){
            return(
                <div className="main-navbar">
                    <ul>
                        <li style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                            <div style=
                                     {{
                                         width: '100px', height: '100px',
                                         backgroundPosition:"center",
                                         backgroundRepeat: 'no-repeat',
                                         backgroundSize: '135px',
                                         backgroundImage: "url(" + profileInfo.basicInfo.profileDisplayAvatar + ")",
                                         borderRadius: '50%',
                                     }}>
                            </div>
                            <span style={{fontWeight: "400", color: "white"}}>{profileInfo.basicInfo.profileDisplayName}</span>
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
                        <li><Link to="/alldiets" className="navbar-links workout-link">
                            <i className="fas fa-dumbbell"></i>All Diets
                        </Link></li>
                        <li><Link to="/usersdiet" className="navbar-links workout-link">
                            <i className="fas fa-dumbbell"></i>Users Diets
                        </Link></li>
                        <li onClick={this.onLogoutClick}><a href='!#' className="navbar-links profile-link"><i
                            className="fas fa-sign-out-alt"></i>Logout</a></li>
                    </ul>
                </div>
            )
            } else {
            return null
            }



    }
}

export default compose(
    firebaseConnect(),
    connect((state,props) =>({
        auth: state.firebase.auth,
        settings: state.settings,
        profile: state.firebase.profile.info,
        profileInfo: state.firebase.profile,
    }))
)(Navbar);