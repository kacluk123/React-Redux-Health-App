import React, {Component} from 'react';
import { firebaseConnect} from 'react-redux-firebase'
import uuid from 'uuid';
import NewFood from '../../components/mydiet/NewFood'
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";


class EditDiet extends Component {
    state = {
        food: '',
        calories: '',
        name: '',
        foods: [],
        totalCalories:'',
        id : uuid(),

    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit = (e) => {
        e.preventDefault();
        const {food, calories} = this.state
        const newFood = {food, calories: Number(calories), id: uuid()}
        this.setState({foods: [...this.state.foods, newFood], calories: '', food: '',})

    }
    totalCalories(){
        const {name, foods, totalCalories} = this.state
        if(foods.length > 0){
            const x = foods.reduce((a,b)=>{
                return a + b.calories
            }, 0)
            return x;
        }
    }

    onClick = () => {
        const {id} = this.state
        const {name, foods, totalCalories} = this.state
        const diet = {arr: [...foods], id: id, name, totalCalories: this.totalCalories()}

        const {firebase} = this.props
        firebase.updateProfile({diet: {[id]: diet}})
            .then(()=> this.setState({id: uuid()}))
    }
    onDelete = (id) => {
        this.setState({
            foods: this.state.foods.filter((el) => el.id !== id)
        })
    }

    render() {

        const {food, calories, foods, name} = this.state
        const {profile, dietID, diet} = this.props
        let x = dietID
       console.log(this.props.dietID.arr)

        if (profile) {
            return (
                <div className="container">
                    <div className="card">
                        <form onSubmit={this.onSubmit} className="form-food">
                            <input onChange={this.onChange} value={food} className="input-food" name="food"
                                   placeholder="Type a food name" type="text"/>
                            <input onChange={this.onChange} value={calories} className="input-calories" name="calories"
                                   placeholder="Calories" type="text"/>
                            <button className="food-add">Add</button>
                        </form>
                        <ol className="food-ul">
                            {this.props.dietID.arr.map((el) =>
                                <li key={el.id}>{el.food}<span className="food-calories">{el.calories} Cal. <i
                                    onClick={this.onDelete.bind(this, el.id)}
                                    style={{color: 'white', paddingLeft: '5px', cursor: 'pointer'}}
                                    className="far fa-trash-alt"></i></span></li>
                            )}
                        </ol>
                        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                            <input onChange={this.onChange} value={name} className="input-calories" name="name"
                                   placeholder="Diet name" type="text"/>

                            <span style={{marginTop: '27px'}}className="food-calories">
                            Total calories:
                                {this.totalCalories()}</span>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                            <button onClick={this.onClick} className="submit">Add Diet</button>
                        </div>

                    </div>


                </div>
            );
        } else {
            return null;
        }
    }
}


export default compose(firestoreConnect(), firebaseConnect(),
    connect((state, props) => ({
        info: state.firebase.profile.info,
        diet: state.firebase.profile.diet,
        profile: state.firebase.profile,
        dietID: state.idRed.idDiet,

    })))(EditDiet);
