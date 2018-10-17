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
                                     backgroundImage: "url('data:image/jpeg;base64,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')",
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
                    <li onClick={this.onLogoutClick}><a href='!#' className="navbar-links profile-link"><i
                        className="fas fa-sign-out-alt"></i>Logout</a></li>




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