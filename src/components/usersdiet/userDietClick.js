import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {connect} from "react-redux";
import {sendId} from "../../actions/IDActions";

class UserDietClick extends Component {
    likeDiet = (diet) =>{
        const newArr = [...this.props.dietID.idDiet.likes, this.props.profile.basicInfo.profileDisplayName ]
        const updateLikes = {...diet, likes: newArr}
        this.props.firestore.update({ collection: 'diets', doc: `${diet.id}`,}, updateLikes )


    }

    closeWindow =()=>{
        this.props.sendId('')
    }


    render() {
        const {dietID} = this.props
        return (
            <div className="UserDietContainer">
                <i onClick={this.closeWindow} style={{alignSelf: 'flex-start',marginLeft: 'auto', cursor:'pointer', fontSize: '35px'}}className="fas fa-times"></i>

                <span className="user-diet-name">{dietID.idDiet.name}</span>
                <ol>{dietID.idDiet.arr.map(el=>
                    <li style={{fontSize: '20px', color: "#393f4d"}}>{el.food}  <span className="food-calories">Calories: {el.calories}</span> </li>)}</ol>
                <p style={{fontSize: '20px', color: "#393f4d"}}>{dietID.idDiet.description}</p>
                <span>Added by: <span style={{fontWeight: '500', fontFamily: 'open Sans'}}>{dietID.idDiet.profileName}</span></span>
                <div style={{
                    width: '100px', height: '100px',
                    backgroundPosition:"center",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '110px',
                    backgroundImage: `url(${dietID.idDiet.profileAvatar})`,
                    borderRadius: '50%',
                }}></div>
                <div style={{display: 'flex', paddingTop: '20px'}}> <span className="food-calories">Likes: {dietID.idDiet.likes.length}</span>
                    <i className="far fa-thumbs-up user-diet-like" onClick={this.likeDiet.bind(this, dietID.idDiet)}></i></div>


            </div>
        );
    }
}

UserDietClick.propTypes = {};

export default compose(firestoreConnect([{ collection: 'diets', }]),
    connect((state)=>({diets: state.firestore.ordered.diets,
        profile: state.firebase.profile,
    }), { sendId }))(UserDietClick);

