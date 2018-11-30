import React, {Component} from 'react';
import PropTypes from 'prop-types';

class OneUserDiet extends Component {
    render() {
        return (
            <div style={{width: '200px', height: "240px",
                backgroundColor: 'white', borderRadius: '50px', display: 'flex',
                justifyContent: 'flex-start', flexDirection: 'column', margin: "10px", alignItems: 'center'}}>
                <span>Name: {this.props.dietName}</span>
                <span className="food-calories">Calories: {this.props.totalCalories}</span>
            </div>
        );
    }
}

OneUserDiet.propTypes = {};

export default OneUserDiet;
