import React, {Component} from 'react';
import { firebaseConnect} from 'react-redux-firebase'

import NewFood from './NewFood'





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
        const newFood = {food,calories}
        this.setState({foods: [...this.state.foods, newFood]})
    }
    onClick = () =>{
        const {name, foods} = this.state
        const {firebase} = this.props
        firebase.updateProfile({diet: {[name]: foods}})
    }

    render() {
        const {food, calories,foods, name} = this.state

        return (
            <div className="container">
                    <div className="card">
                        <form onSubmit={this.onSubmit} className="form-food">
                            <input onChange={this.onChange} value={food} className="input-food" name="food" placeholder="Type a food name" type="text"/>
                            <input onChange={this.onChange} value={calories} className="input-calories"name="calories" placeholder="Calories" type="text"/>
                            <button className="add-food">Add</button>
                        </form>
                            <ul>
                                {foods.map((el)=>
                                <li>{el.food}{el.calories}</li>
                                )}
                            </ul>


                        <input onChange={this.onChange} value={name} className="input-calories"name="name" placeholder="Diet name" type="text"/>

                        <button onClick={this.onClick} className="add-food">Add Diet</button>
                    </div>




            </div>
        );
    }
}


export default (firebaseConnect())(MyDiet);
