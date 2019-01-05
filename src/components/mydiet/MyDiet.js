import React, {Component} from 'react';
import { firebaseConnect} from 'react-redux-firebase'
import uuid from 'uuid';
import NewFood from './NewFood'
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";


class MyDiet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            food: '',
            calories: '',
            name: '',
            foods: [],
            totalCalories:'',
            id : uuid(),
            input: false,
            errors: {},

        }



    }
    onChangeX = (index, food, calories, id) => {
        this.setState(prevState => {
            const foods = [...prevState.foods];
            foods[index] = {food, calories,id };
            return { foods };
        });
    };
    onChangeG = (index, calories, food, id) => {
        this.setState(prevState => {
            const foods = [...prevState.foods];
            foods[index] = {food, calories,id };
            return { foods };
        });
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit = (e) => {
        e.preventDefault();
        const {food, calories, errors} = this.state
        if (food === ""){
            this.setState({ errors: {...errors, food: "Food name is required!"}})
        }
        else if(calories === ""){
            this.setState({ errors: { ...errors, calories: "Calories is required!"}})
        }
        else{
            const newFood = {food, calories: Number(calories), id: uuid()}
            this.setState({foods: [...this.state.foods, newFood], calories: '', food: '', errors: {}})
        }
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
        const {name, foods, totalCalories,errors} = this.state
        const diet = {arr: [...foods], id: id, name, totalCalories: this.totalCalories()}
        const {firebase} = this.props
        if(name === ""){
           this.setState({errors: {...errors, name: "Name is required!"}})
        } else if(diet.arr.length === 0){
           this.setState({errors: {...errors, length: "Add food!"}})
        } else {
            firebase.updateProfile({diet: {[id]: diet}})
                .then(()=> this.setState({id: uuid(), errors: {}}))

        }
    }
    onDelete = (id) => {
        this.setState({
            foods: this.state.foods.filter((el) => el.id !== id)
        })
    }
    editDiet = (id, calories) =>{
        this.setState({
            input: !this.state.input
        })
    }

    render() {
        const {food, calories, foods, name, input,errors} = this.state
        const {profile} = this.props
        console.log(Object.values(errors))

        if (profile) {
            return (
                <div className="container">
                    <div className="card">
                        <form onSubmit={this.onSubmit} className="form-food">
                            <input onChange={this.onChange} value={food} className="input-food" name="food"
                                   placeholder="Type a food name" type="text"/>

                            <input onChange={this.onChange} value={calories} className="input-calories" name="calories"
                                       placeholder="Calories" type="number"/>







                            <button className="food-add">Add</button>
                        </form>
                        <ol className="food-ul">
                            {foods.map((el, index) =>
                                <li key={el.id}>
                                    <div style={{float: 'right'}}>
                                        <i
                                            onClick={this.onDelete.bind(this, el.id)}
                                            style={{color: 'white', paddingLeft: '5px', cursor: 'pointer'}}
                                            className="far fa-trash-alt">
                                        </i>
                                        <i onClick={this.editDiet.bind(this, el.id, el.calories)}
                                           style={{color: 'white', paddingLeft: '5px', cursor: 'pointer'}} className="far fa-edit"></i>
                                    </div>


                                    {input ?  <div><input className="input-food-edit" onChange={event => this.onChangeX(index, event.target.value ,el.calories, el.id)}
                                                          value={el.food}  type="text"/>


                                            <input className="input-calories-edit" onChange={ev => this.onChangeG(index, ev.target.value ,el.food, el.id)}
                                                   value={el.calories}  type="text"/></div>
                                        : <React.Fragment><span>{el.food}</span>
                                        <span className="food-calories">{el.calories}Cal.</span></React.Fragment>}

                                </li>
                            )}
                        </ol>
                        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                            <input onChange={this.onChange} value={name} className="input-calories" name="name"
                                   placeholder="Diet name" type="text"/>

                            <span style={{marginTop: '27px'}}className="food-calories">
                            Total calories:
                                {this.totalCalories()}</span>
                        </div>
                        <div style={{width: '100%', display:'flex', justifyContent: 'center' }}>
                            <span className="food-calories" style={{margin: '0 auto'}}>
                                {errors.calories ||
                                    errors.food || errors.name || errors.length}</span>
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
})))(MyDiet);
