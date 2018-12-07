import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {sendId} from "../../actions/IDActions";
import {compose} from "redux"

import {connect} from "react-redux";

class OneUserDiet extends Component {
    dietSend = (whole) =>{
        this.props.sendId({...whole, edit: true})
    }
    render() {
        return (
            <div style={{width: '200px', height: "240px",
                backgroundColor: 'white', borderRadius: '50px', display: 'flex',
                justifyContent: 'flex-start', flexDirection: 'column', margin: "10px", alignItems: 'center'}}>
                <span style={{paddingTop: '10px'}}>Name: {this.props.dietName}</span>
                <span className="food-calories">Calories: {this.props.totalCalories}</span>
                <span>{this.props.description.substr(0, 20)}...</span>

                <span style={{fontSize: '15px'}}>Added by:</span>
                <span>{this.props.profileName}</span>
                <div style={{width: "50px", height: '50px', backgroundSize: 'cover',
                    backgroundPosition:'center', backgroundImage: `url(${this.props.profileAvatar})`, borderRadius: '50%'}}></div>
                <span className="food-calories">Likes: {this.props.likes.length > 0 ? this.props.likes.length : 0 }</span>
                <button style={{fontSize: '14px'}} onClick={this.dietSend.bind(this, this.props.whole)} className="share">See more</button>
            </div>
        );
    }
}

OneUserDiet.propTypes = {};

export default compose(
    connect((state)=>({
        diets: state.firestore.ordered.diets,
        dietID: state.idRed,
    }), { sendId }))(OneUserDiet);

