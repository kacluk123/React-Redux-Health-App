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
        pages: [],
        pageActive: 1,
        pagesNumber : 0,
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
    pageChange(el){
        this.setState({pageActive: el})
    }
    pagePlus=()=>{
        const {comments} = this.state.data
        const chunkIndex = Math.floor(comments.length/3)
        this.setState({pageActive: this.state.pageActive !== chunkIndex ? this.state.pageActive +1 : 0})
    }
    pageMinus = () => {
        const {comments} = this.state.data
        const chunkIndex = Math.floor(comments.length/3)
        this.setState({pageActive: this.state.pageActive > 0 ? this.state.pageActive -1 : chunkIndex})
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
        const perChunk = 3
        const pageNumbers = [];
        const x = comments ? comments.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index/perChunk)
            if(!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = []
            }
            resultArray[chunkIndex].push(item)
            return resultArray
        }, []) : []
        x.forEach((el,i)=> pageNumbers.push(i))
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
                    {x[this.state.pageActive] !== undefined ? x[this.state.pageActive].map((el,key)=> <li key={key}>
                       <div style={{display: 'flex',}}>
                           <div style={{backgroundImage: `url(${el.authorAvatar})`,}} className="comment-container-img"></div>
                           <div className="comment-container-text-container">
                               <span>{el.author}</span>
                               <p>{el.description}</p>
                           </div>
                       </div>
                        </li>) : []}
                </ul>
                <ul style={{display: 'flex', borderRadius: '20px', listStyle: "none", position: 'absolute', bottom: '-80px', left: '33.33333%',}}>
                    <li style={{fontSize: "50px"}}><i className="fas fa-angle-left" onClick={this.pageMinus}></i> </li>
                    {
                        pageNumbers
                            .slice(this.state.pageActive, this.state.pageActive+4 )
                            .map(el=>
                                <li style={{fontSize: '30px',
                                    textAlign: 'center', width: '50px',
                                    height: '50px', border:
                                        '1px solid black',
                                    background: "#393f4d",
                                    color: this.state.pageActive === el ? "#FF4136" : "black",
                                    cursor: 'pointer',
                                    fontFamily: " 'Open Sans', sans-serif"}} onClick={this.pageChange.bind(this, el)}>{el}
                                </li>)
                    }
                    <li style={{fontSize: "50px"}}><i onClick={this.pagePlus} className="fas fa-angle-right"></i>  </li>
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

