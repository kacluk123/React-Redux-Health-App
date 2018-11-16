import React, {Component} from 'react';
import {firebaseConnect} from "react-redux-firebase";
import {compose} from 'redux';
import {connect} from 'react-redux';
import Slider from "react-slick";
import PropTypes from 'prop-types';
import OneDiet from './OneDiet'
import {firestoreConnect} from "react-redux-firebase";

class AllDiets extends Component {
    state = {
        search: ''
    }
    onChange = (e) =>{
        this.setState({[e.target.name]: e.target.value.substr(0,20)})
    }
    render() {
        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1
        };
        const { diet, profile } = this.props
        if(profile && diet !== undefined){
            let filter = Object.values(diet).filter((dietItem)=>{
                return dietItem.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1})
            return (
                <div className="container">
                    <div className="card">
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <input className="search-input" placeholder="Search diet" onChange={this.onChange} type="text" name="search"/>
                        </div>
                        <Slider {...settings}> {filter.map((el)=> <OneDiet id={el.id} whole={el} totalCalories={el.totalCalories} foods={el.arr} name={el.name}/>)}</Slider>


                    </div>

                </div>
            );
        } else {
            return <span>...Loading</span>
        }
    }
}



export default compose(firestoreConnect(), firebaseConnect(),
    connect((state) => ({
        diet: state.firebase.profile.diet,
        profile: state.firebase.profile,

    })))(AllDiets);
