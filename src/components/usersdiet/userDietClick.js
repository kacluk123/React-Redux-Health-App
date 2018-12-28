import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {connect} from "react-redux";
import {sendId} from "../../actions/IDActions";

class UserDietClick extends Component {
    state = {
        data : '',
        className: "",
        comment: "",
    }

    componentDidMount() {
        this.props.firestore.setListeners([
            {collection: 'diets'},
            {collection: 'users'},
        ])
        this.setState({data: this.props.dietID.idDiet,
            className: this.props.dietID.idDiet.likes.includes(this.props.profile.basicInfo.profileDisplayName)
        ? "far fa-thumbs-up user-diet-no-like" : "far fa-thumbs-up user-diet-like"})
    }

    onChange =(e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    likeDiet =()=>{
        const {likes} = this.state.data
        const {data} = this.state
        const {profileDisplayName} = this.props.profile.basicInfo
        likes.includes(profileDisplayName) ?
            this.setState({data: {...data, likes:[...likes.filter(el=> el !== profileDisplayName)]}, className: 'far fa-thumbs-up user-diet-like'}) :
            this.setState({data: {...data, likes:[...likes, profileDisplayName]}, className: 'far fa-thumbs-up user-diet-no-like' })
    }

    addComment =()=>{
        const {comments} = this.state.data
        const {data,comment} = this.state
        const {profileDisplayName, profileDisplayAvatar} = this.props.profile.basicInfo
        const newComment = {
            description: comment,
            author : profileDisplayName,
            authorAvatar : profileDisplayAvatar,
        }
        this.setState({data: {...data, comments:[...comments, newComment]}})


    }
    closeWindow =()=>{
        this.props.sendId('')
        this.forceUpdate()
    }
    componentWillUnmount(){
        this.props.firestore.update({ collection: 'diets', doc: `${this.state.data.id}`,}, this.state.data )
    }

    render() {
        const {dietID} = this.props;
        const {comments} = this.state.data;
        console.log(comments)
        return (

            <div className="UserDietContainer">
                <i onClick={this.closeWindow.bind(this, dietID.idDiet)} style={{alignSelf: 'flex-start',marginLeft: 'auto', cursor:'pointer', fontSize: '35px'}}className="fas fa-times"></i>

                <span className="user-diet-name">{dietID.idDiet.name}</span>
                <ol>{dietID.idDiet.arr.map(el=>
                    <li style={{fontSize: '20px', color: "#393f4d"}}>{el.food}  <span className="food-calories">Calories: {el.calories}</span> </li>)}</ol>
                <p style={{fontSize: '20px', color: "#393f4d"}}>{dietID.idDiet.description}</p>
                <span>Added by: <span style={{fontWeight: '500', fontFamily: 'open Sans'}}>{dietID.idDiet.profileName}</span></span>
                <div style={{
                    width: '100px', height: '100px',
                    backgroundPosition:"center",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '110px',
                    backgroundImage: `url(${dietID.idDiet.profileAvatar})`,
                    borderRadius: '50%',
                }}></div>
                <div style={{display: 'flex', paddingTop: '20px'}}> <span className="food-calories">Likes: {this.state.data.likes ? this.state.data.likes.length : []}</span>
                    <i className={this.state.className} onClick={this.likeDiet.bind(this, dietID.idDiet)}></i></div>

                <textarea name="comment" value={this.state.comment} onChange={this.onChange} style={{width: '100%', height: '100px', marginTop: '20px'}}></textarea>
                <button className="share" onClick={this.addComment} style={{marginTop: '20px'}}>Add comment</button>
                <ul className="comment-container">
                    {comments ? comments.map((el,key)=> <li key={key}>
                       <div style={{display: 'flex',}}>
                           <div style={{backgroundImage: `url(${el.authorAvatar})`,}} className="comment-container-img"></div>
                           <div className="comment-container-text-container">
                               <span>{el.author}</span>
                               <p>{el.description}</p>
                           </div>
                       </div>
                        </li>) : []}
                </ul>
            </div>
        );
    }
}

UserDietClick.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default compose(firestoreConnect([{ collection: 'diets', }]),
    connect((state)=>({diets: state.firestore.ordered.diets,
        profile: state.firebase.profile,
    }), { sendId }))(UserDietClick);

