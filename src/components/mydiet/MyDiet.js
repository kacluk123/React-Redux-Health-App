import React, {Component} from 'react';
import NewFood from './NewFood'
class MyDiet extends Component {
    state = {
        food : '',
        calories : '',
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

    render() {
        const {food, calories,foods} = this.state

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
                                <li>{el.food}</li>
                                )}
                            </ul>



                        <button className="add-food">Add Diet</button>
                    </div>




            </div>
        );
    }
}


export default MyDiet;
