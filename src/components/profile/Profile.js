import React, {Component} from 'react';
import { firebaseConnect} from 'react-redux-firebase'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class Profile extends Component {
    state = {
        data: '',
    }
    sendData = (e) =>{
        e.preventDefault()
        const { firestore ,firebase, history, auth} = this.props
        const data = this.state
        firebase.updateProfile({ TEST: 'TEST' })

    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        return (
          <div>
              dasdas
              <form >
                  <input name='data' value={this.state.data} onChange={this.onChange} type="text"/>
                  <button onClick={this.sendData}>Send Test Data</button>
              </form>
          </div>
        );
    }
}


export default compose(firestoreConnect(), firebaseConnect(),
    connect((state,props) =>({
        auth: state.firebase.auth,
    })))(Profile);
