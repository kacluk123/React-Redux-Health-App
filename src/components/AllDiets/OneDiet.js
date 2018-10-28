import React, {Component} from 'react';
import PropTypes from 'prop-types';

class OneDiet extends Component {
    render() {
        console.log(this.props.name)
        return (
            <div  style={{width: '100px',margin:'20px', height: '100px', background: '#CAE4DB'}}>
                <span>{this.props.name}</span>
            </div>
        );
    }
}


export default OneDiet;
