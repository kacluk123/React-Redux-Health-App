import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {compose} from "redux"
import OneUserDiet from './OneUserDiet'
import UserDietClick from './userDietClick'
import {firebaseConnect, firestoreConnect} from 'react-redux-firebase'
import {sendId} from "../../actions/IDActions";

class UsersDiets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [],
            pageActive: 1,
            pagesNumber : 0,
        };
    }
    componentDidMount(){
        this.props.firestore.setListeners([
            { collection: 'diets' },
            { collection: 'users' },
        ])
    }
    pageChange(el){
        this.setState({pageActive: el})
    }
    pagePlus=()=>{
        const {diets} = this.props
        const chunkIndex = Math.floor(diets.length/3)
        this.setState({pageActive: this.state.pageActive !== chunkIndex ? this.state.pageActive +1 : 0})
    }
    pageMinus = () => {
        const {diets} = this.props
        const chunkIndex = Math.floor(diets.length/3)
        this.setState({pageActive: this.state.pageActive > 0 ? this.state.pageActive -1 : chunkIndex})
    }

    render() {
        const {diets, dietID} = this.props
        const {pageActive} = this.state
        let dietList = [];
        dietList = diets !== undefined ? [...diets] : [];
        const perChunk = 3
        const pageNumbers = [];
        const inputArray = [ ...dietList]
        const x = inputArray.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index/perChunk)
            if(!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = []
            }
            resultArray[chunkIndex].push(item)
            return resultArray
        }, [])
        x.forEach((el,i)=> pageNumbers.push(i))
        return (
            <div className="container">
            <div className="card" style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                {dietID.idDiet.edit ? <UserDietClick dietID={dietID} /> : null}
                {(diets && x[this.state.pageActive]) ?  x[this.state.pageActive].map(el=> <OneUserDiet key={el.id}
                                                                   dietName={el.name}
                                                                   totalCalories={el.totalCalories}
                                                                   description={el.description}
                                                                   profileName={el.profileName}
                                                                   likes={el.likes}
                                                                   profileAvatar={el.profileAvatar}
                                                                   whole={el}
                />) : []}


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
            </div>
        );

    }
}

UsersDiets.propTypes = {};

export default compose(firestoreConnect([{ collection: 'diets', }]),
    connect((state)=>({diets: state.firestore.ordered.diets,
                        dietID: state.idRed,
        profile: state.firebase.profile,
    }), { sendId }))(UsersDiets);
