import React, {Component} from 'react';
import { firebaseConnect} from 'react-redux-firebase'
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
class Profile extends Component {
    constructor(props){
        super(props)
        this.state ={
            errors: {},
            gender: "",
        }

        this.weight = React.createRef();
        this.height = React.createRef();
        this.age = React.createRef();
        this.name = React.createRef();
        this.avatar = React.createRef();
    }

    handleChange =(event)=> {
        this.setState({
            gender: event.target.value
        });
    }



    sendData = (e) =>{
        e.preventDefault()
        const {firebase, history} = this.props
        const {age, weight, height, displayName, gender, displayAvatar} = this.state
        const heightSquare = Number(this.height.current.value * 0.01) * Number(this.height.current.value * 0.01);
        const basicData = {
            profileAge: this.age.current.value,
            profileWeight: this.weight.current.value,
            profileHeight: this.height.current.value,
            profileDisplayAvatar: this.avatar.current.value,
            profileDisplayName: this.name.current.value,
            profileBmi: (Number(this.weight.current.value) / heightSquare).toFixed(1),
            profileProteins: 1.5 * Number(this.weight.current.value),
            profileFats: 1.2 * Number(this.weight.current.value),
            profileCarbs: 3 * Number(this.weight.current.value),
            caloriesNeed: gender === 'man' ? (9.99 * Number(this.weight.current.value)) + (6.25 * Number(this.height.current.value,))
                - (4.92 * Number(this.age.current.value)) + 5 : (9.99 * Number(this.weight.current.value)) + (6.25 * Number(this.height.current.value,))
                - (4.92 * Number(this.age.current.value)) - 161,
        }

        if(this.age.current.value === ''){
            this.setState({errors: {age: 'Age is required!'  }})
        }
        else if(this.weight.current.value === ''){
            this.setState({errors: {weight: 'Weight is required!'  }})
        }
        else if(this.height.current.value === ''){
            this.setState({errors: {height: 'Height is required!'  }})
        }
        else if(this.name.current.value === '' || this.name.current.value.length < 4 || this.name.current.value.length > 10 ){
            this.setState({errors: {displayName: 'Name is required, and it need to be between 4 and 10 characters!'  }})
        }
        else if(gender === ""){
            this.setState({errors: {genderErr: "You must select woman or man!"}})
        }
        else {
            firebase.updateProfile({ basicInfo: basicData, info: true}).then(history.push('/profile'))
        }










    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        if(this.props.profile){
        const {errors} = this.state
        const { profileAge, profileWeight, profileHeight, profileDisplayAvatar, profileDisplayName, profileGender} = this.props.profile;
        return (
               <div className="formContainer">
                   <div className="col5">
                       <form onSubmit={this.sendData}>
                           <div className="row">

                               <div className="col3">
                                   <div className="input-container">
                                       <div className='checkbox-container'>
                                           <span className="gender">Woman</span>
                                           <input value="woman"  onChange={this.handleChange} defaultChecked={true} checked={this.state.gender === 'woman'} type="radio"/>
                                       </div>

                                       <input onChange={this.onChange} ref={this.weight} defaultValue={profileWeight}  type="number" name='weight'
                                              placeholder='Weight'/>
                                       <input onChange={this.onChange} ref={this.age} defaultValue={profileAge} type="number" name='age' placeholder="Age"/>
                                   </div>


                               </div>
                               <div className="col3">
                                   <div className="input-container">
                                       <div className='checkbox-container'>
                                           <span className="gender">Men</span>
                                           <input value="man" onChange={this.handleChange} checked={this.state.gender === "man"} type="radio"/>
                                       </div>
                                       <input onChange={this.onChange} ref={this.height}    defaultValue={profileHeight} name='height' type="number" placeholder="Height"/>
                                       <input onChange={this.onChange} ref={this.name}     defaultValue={profileDisplayName} name='displayName' type="text" placeholder="Display name"/>
                                   </div>

                               </div>
                           </div>
                           <div className="row">

                               <div className="send-data">
                                   <div style={{width: '77%'}}className="input-container">
                                       <input  onChange={this.onChange} ref={this.avatar} defaultValue={profileDisplayAvatar} name='displayAvatar' type="text" placeholder="Avatar url"/>
                                   </div>
                               </div>

                           </div>



                           <div className="row">

                               <div className="send-data">
                                   <input  type='submit' value="Submit"/>

                               </div>

                           </div>
                           <div className="row">
                               <span style={{color: "#FF4136"}}>{Object.values(errors)}</span>
                           </div>



                       </form>
                   </div>
               </div>

           );
       } else {
           return <span>Loading...</span>;
       }

    }






}
Profile.propTypes = {
    profile: PropTypes.object.isRequired,
}
export default compose(firestoreConnect(), firebaseConnect(),
    connect((state,props) =>({
        profile: state.firebase.profile.basicInfo,
    })))(Profile);
