import React, {Component} from 'react';
import {firebaseConnect} from "react-redux-firebase";
import {compose} from 'redux';
import {connect} from 'react-redux';
import Slider from "react-slick";
import PropTypes from 'prop-types';
import OneDiet from './OneDiet'
import {sendId} from "../../actions/IDActions";
import {firestoreConnect} from "react-redux-firebase";
import store from "../../store";

class AllDiets extends Component {
    state = {
        search: '',
        description: '',
    }
    onChange = (e) =>{
        this.setState({[e.target.name]: e.target.value.substr(0,20)})
    }
    closeWindow =()=>{
        this.props.sendId('')

    }
    shareDiet = () =>{
        this.props.firestore.add({ collection: 'diets' },
            {...this.props.dietID.idDiet, description: this.state.description,
                profileName: this.props.profile.basicInfo.profileDisplayName,
                profileAvatar: this.props.profile.basicInfo.profileDisplayAvatar,
            })
        this.setState({description: ''})
        this.props.sendId('')
    }
    description = (e) =>{
        this.setState({description: e.target.value })
    }
    render() {
        console.log(this.props.dietID.idDiet)
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
                        {this.props.dietID.idDiet ? <div style={{
                            zIndex: '9999',
                            position: 'absolute',
                            display: 'flex',
                            background: 'white',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '400px',
                            padding: '20px',
                            height: '210px',
                            borderRadius: '20px',
                            top: '35%',
                            left: '20%',
                            ttransform: "translate(-50%, -50%)",
                        }}>
                            <i onClick={this.closeWindow} style={{alignSelf: 'flex-end', cursor:'pointer', fontSize: '20px'}}className="fas fa-times"></i>
                            <span style={{paddingTop: '4px',
                    fontWeight: "lighter",
                    fontSize: "20px",
                    color: "#393f4d",
                    fontFamily: "'Open Sans', sans-serif",

                }}>Write some description about your diet!</span>
                            <textarea onChange={this.description} value={this.state.description} style={{width: '100%', height: '70px'}}></textarea>
                            <button className="share" onClick={this.shareDiet} style={{marginTop: '20px', disabled: 'true'}}>Share</button>


                        </div> : null}


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
        dietID: state.idRed,

    }), { sendId }))(AllDiets);
