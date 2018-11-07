import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {firebaseConnect, firestoreConnect} from "react-redux-firebase";
import {sendId} from "../../actions/IDActions";
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import {compose} from "redux";
class OneDiet extends Component {

    onSend = (el) => {
        this.props.sendId(el)
    }

    render() {
        const {name, foods, id, whole} = this.props

        return (

            <div className="diet-container" >
                <div style={{width: '100%', display: 'flex', justifyContent:'center'}}><span className="diet-name">{this.props.name}</span></div>
                <ol className="food-list">{foods.map((el,i)=> <li key={i}><span>{el.food}</span></li>)}</ol>
                <div style={{width: '100%', display: 'flex', justifyContent:'center'}}>
                    <span className="food-calories">
                    {this.props.totalCalories} Calories
                    </span>
                </div>

                <div style={{display: 'flex', width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-end'}}>

                    <Link to={`/edit/${id}`}> <span style={{marginBottom: '25px'}}><i onClick={this.onSend.bind(this, whole)} style={{fontSize: '40px'}}className="far fa-edit"></i></span>

                   </Link>

                </div>
            </div>
        );
    }
}
OneDiet.propTypes = {
    name: PropTypes.string.isRequired,
}
export default compose(firestoreConnect(), firebaseConnect(),
    connect((state) => ({
        diet: state.firebase.profile.diet,
        profile: state.firebase.profile,
        dietID: state.idRed,
    }), { sendId }))(OneDiet);
