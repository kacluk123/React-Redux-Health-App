import React, {Component} from 'react';
import { firebaseConnect} from 'react-redux-firebase'
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class UserProfile extends Component {

    render() {

        return (
            <div className="container">
                <div className="card">

                </div>
            </div>
        );
    }
}

UserProfile.propTypes = {
    profile: PropTypes.object.isRequired,
}
export default compose(firestoreConnect(), firebaseConnect(),
    connect((state) =>({

        profile: state.firebase.profile.basicInfo
    })))(UserProfile);
