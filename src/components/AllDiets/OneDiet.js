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
        this.props.sendId(el)
    }
    shareDiet = (diet) =>{

        this.props.firestore.add({ collection: 'diets' }, { diet })

    }
    onDelete = () =>{
        const {firebase, diet, id} = this.props
        firebase.updateProfile({diet: Object.values(diet).filter((el)=> el.id !== id) })
    }
    description = (e) =>{
        this.setState({description: e.target.value })
    }
    alertWindow =()=>{
        this.setState({share: !this.state.share})
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
                {this.state.share ? <div style={{position: 'absolute',
                    display: 'flex',
                    background: 'white',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '400px',
                    padding: '20px',
                    height: '200px',
                    borderRadius: '20px',
                    top: '200px',
                    left: '150px',}}>
                <span style={{paddingTop: '10px',
                    fontWeight: "lighter",
                    fontSize: "20px",
                    color: "#393f4d",
                    fontFamily: "'Open Sans', sans-serif",

                }}>Write some description about your diet!</span>
                    <textarea onChange={this.description} value={this.state.description} style={{width: '100%', height: '70px'}}></textarea>
                    <button className="share" onClick={this.shareDiet.bind(this, whole)} style={{marginTop: '20px', disabled: 'true'}}>Share</button>


                </div> : null}
                <div style={{display: 'flex', width: '100%' ,height: '100%', padding: '10px' ,justifyContent: 'space-between', alignItems: 'flex-end'}}>

                    <Link style={{color: '#393f4d'}}to={`/edit/${id}`}> <span>

                        <i onClick={this.onSend.bind(this, whole)} style={{fontSize: '40px'}}className="far fa-edit"></i></span>
                    </Link>

                    <button className="share" onClick={this.alertWindow}>Share</button>


                    <div onClick={this.onDelete} style={{fontSize: '40px', display: 'block', height: '47px',color: '#393f4d' }} ><i className="far fa-trash-alt"></i></div>
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
