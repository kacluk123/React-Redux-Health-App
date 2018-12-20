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

    render() {
        const {diets, dietID} = this.props
        const {pageActive} = this.state
        const pageNumbers = [];
        let dietList = [];

        dietList = diets !== undefined ? [...diets] : [];
            console.log(dietList)

        const perChunk = 9
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

        console.log(pageNumbers)
        return (
            <div className="container">
            <div className="card" style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                {dietID.idDiet.edit ? <UserDietClick dietID={dietID} /> : null}
                {diets !== undefined ? x[this.state.pageActive].map(el=> <OneUserDiet key={el.id}
                                                                   dietName={el.name}
                                                                   totalCalories={el.totalCalories}
                                                                   description={el.description}
                                                                   profileName={el.profileName}
                                                                   likes={el.likes}
                                                                   profileAvatar={el.profileAvatar}
                                                                   whole={el}
                />) : []}


        <ul style={{display: 'flex', listStyle: "none"}}>{
            pageNumbers.map(el=><li style={{fontSize: '30px'}} onClick={this.pageChange.bind(this, el)}>{el}</li>)

        }</ul>
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
