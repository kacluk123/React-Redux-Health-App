import React, {Component} from 'react';
import { firebaseConnect} from 'react-redux-firebase'
import uuid from 'uuid';
import Loader from '../layout/Loader'
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";


class MyDiet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            food: "",
            calories: '',
            name: '',
            foods: [],
            totalCalories:'',
            id : uuid(),
            input: false,
            errors: {},
            message : '',
            showLoader: false,

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
        const {errors} = this.state
        this.setState({[e.target.name]: e.target.value})
        if(e.target.value === ""){
            this.setState({errors: {...errors, [e.target.name]: `${e.target.name} required`}})
        } else{
            this.setState({errors: {...errors, [e.target.name]: ""}})
        }


    }
    validate(type){
        const {food, calories, name,  errors, foods} = this.state
        switch (type){
            case "local":
                const err = {}
                let isError = false;
                if (food === ""){
                    err.food = "Food required";
                    isError = true;
                }
                if(calories === ""){
                    err.calories = "Calories required!";
                    isError = true;
                }
                if(isError){
                    this.setState({errors: err})
                    return isError
                }
                break
            case "db":
                let canSend = false
                const errcan = {}
                if(name === ""){
                    errcan.name = "Required!";
                    canSend = true;
                }
                if(foods.length === 0){
                    errcan.name = "Add food!";
                    canSend= true;
                }
                if(canSend){
                    this.setState({errors: errcan})
                    return canSend
                }
                break
                }
    }
    onSubmit = (e) => {
        e.preventDefault();
        const {food, calories, errors} = this.state
        if(!this.validate("local")){
            const newFood = {food, calories: Number(calories), id: uuid()}
            this.setState({foods: [...this.state.foods, newFood], calories: '', food: '', errors: {}})
        }
        console.log(this.validate())
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
        if(!this.validate("db")){
                this.setState({showLoader: true})
                firebase.updateProfile({diet: {[id]: diet}})
                    .then(()=> {
                        this.setState({id: uuid(), errors: {},
                            showLoader: false, foods: [], name: "", message: "Successfully added to database!"})
                        setTimeout(()=>{
                           this.setState({
                               message: ""
                           })
                       },3000)
                    })
            }

        }

    onDelete = (id) => {
        this.setState({
            foods: this.state.foods.filter((el) => el.id !== id)
        })
    }
    editDiet = () =>{
        this.setState({
            input: !this.state.input
        })
    }


    render() {
        const {food, calories, foods, name, input,errors,message,showLoader} = this.state
        const {profile} = this.props
        console.log(errors)

        if (profile) {
            return (
                <div className="container">
                    <div className="card">
                        <form onSubmit={this.onSubmit} className="form-food">
                            <div className="input-container-food">
                                <input onChange={this.onChange} value={food} className="input-food" name="food"
                                       placeholder="Type a food name" type="text"/>
                                <span className="error-message">{errors.food}</span>
                            </div>

                            <div className="input-container-calories">
                                <input onChange={this.onChange} value={calories} className="input-calories" name="calories"
                                       placeholder="Calories" type="number"/>
                                <span className="error-message">{errors.calories}</span>
                            </div>
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
                            <div className="input-calories-container">
                                <input onChange={this.onChange} value={name} className="input-calories" name="name"
                                       placeholder="Diet name" type="text"/>
                                <span className="error-message">{errors.name}</span>
                            </div>

                            <span style={{margin: '10px 0 0 10px '}}className="food-calories">
                            Total calories:
                                {this.totalCalories()}</span>
                        </div>
                        <div style={{width: '100%', display:'flex', justifyContent: 'center' }}>
                            <span className="food-calories" style={{margin: '0 auto'}}></span>
                        </div>

                        <div style={{display: 'flex', alignItems: 'center', width: '100%',flexDirection: "column"}}>
                            <div style={{width: '100%', display: 'flex', justifyContent: 'center', position: 'relative'}}>
                                <button onClick={this.onClick} style={{color: !showLoader ? "white" : "transparent"}}className="submit">Add Diet</button>
                                {showLoader ? <Loader/> : null}
                            </div>
                            <span className="error-message">{message}</span>

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
