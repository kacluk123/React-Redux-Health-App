import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {firebaseConnect, firestoreConnect} from "react-redux-firebase";
import {sendId} from "../../actions/IDActions";
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import {compose} from "redux";

class OneDiet extends Component {
    state = {
        share : false,
        description: '',

    }
    onSend = (el) => {

        this.props.sendId({...el, edit: false})
    }
    sendDiet = (whole) =>{

        this.props.sendId({...whole, edit: true})

    }

    onDelete = () =>{
        const {firebase, diet, id} = this.props
        firebase.updateProfile({diet: Object.values(diet).filter((el)=> el.id !== id) })
    }

    alertWindow =()=>{
        this.setState({share: !this.state.share})
    }
    render() {
        const {name, foods, id, whole} = this.props
        return (

            <div className="diet-container" style={{position: 'relative'}}>
                <div style={{width: '100%', display: 'flex', justifyContent:'center'}}><span className="diet-name">{this.props.name}</span></div>
                <ol className="food-list">{foods.map((el,i)=> <li key={i}><span>{el.food}</span></li>)}</ol>
                <div style={{width: '100%', display: 'flex', justifyContent:'center'}}>
                    <span className="food-calories">
                    {this.props.totalCalories} Calories
                    </span>
                </div>
                <div style={{display: 'flex', width: '100%' ,height: '100%', padding: '10px' ,justifyContent: 'space-between', alignItems: 'flex-end'}}>

                        <Link style={{color: '#393f4d'}}to={`/edit/${id}`}> <span>
                        <i onClick={this.onSend.bind(this, whole)} style={{fontSize: '40px'}}className="far fa-edit"></i></span>
                        </Link>

                    <button className="share" onClick={this.sendDiet.bind(this,whole)}>Share</button>


                    <div onClick={this.onDelete} style={{fontSize: '40px', display: 'block', height: '47px',color: '#393f4d' }} ><i className="far fa-trash-alt"></i></div>
                </div>

            </div>
        );
    }
}
OneDiet.propTypes = {
    name: PropTypes.string.isRequired,
}
export default compose(firestoreConnect([{ collection: 'diets' }]), firebaseConnect(),
    connect((state) => ({
        diet: state.firebase.profile.diet,
        profile: state.firebase.profile,
        dietID: state.idRed,
        diets: state.firestore.ordered.diets,
    }), { sendId }))(OneDiet);
