import React, {Component} from 'react';
import { firebaseConnect} from 'react-redux-firebase'
import uuid from 'uuid';
import NewFood from './NewFood'
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";





class MyDiet extends Component {
    state = {
        food : '',
        calories : '',
        name : '',
        foods : [],
    }
    onChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit = (e) =>{
        e.preventDefault();
        const {food, calories} = this.state
        const newFood = {food,calories,}
        this.setState({foods: [...this.state.foods, newFood]})
    }
    onClick = () =>{
        const {name, foods} = this.state
        const diet = [...foods, {id: uuid()}]
        const {firebase} = this.props
        firebase.updateProfile({diet: {[name]: diet}})
    }

    render() {
        const {food, calories,foods, name} = this.state
        const {diet} = this.props

        console.log(diet)
        if(diet){
            return (
                <div className="container">
                    <div className="card">
                        <form onSubmit={this.onSubmit} className="form-food">
                            <input onChange={this.onChange} value={food} className="input-food" name="food" placeholder="Type a food name" type="text"/>
                            <input onChange={this.onChange} value={calories} className="input-calories"name="calories" placeholder="Calories" type="text"/>
                            <button className="add-food">Add</button>
                        </form>
                        <ul className="food-ul">
                            {foods.map((el)=>
                                <li>{el.food}{el.calories}</li>
                            )}
                        </ul>
                        <ul className="food-ul">
                            {diet.adas.map((el)=>
                                <li>{el.food}{el.calories}</li>
                            )}
                        </ul>

                        <input onChange={this.onChange} value={name} className="input-calories"name="name" placeholder="Diet name" type="text"/>

                        <button onClick={this.onClick} className="add-food">Add Diet</button>
                    </div>




                </div>
            );
        } else {
            return null;
        }
    }
}


export default compose(firestoreConnect(), firebaseConnect(),
    connect((state,props) =>({
        info: state.firebase.profile.info,
        diet: state.firebase.profile.diet,
    })))(MyDiet);
