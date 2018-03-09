import React, { Component } from 'react';
import Reference from './reference';

class FieldsetReference extends Component {
    render() {
        return(
            <div>
                <Reference qtyReference={this.props.index}/>
                <input name={ `field-qty-${ this.props.index }` } type="textfield" />
            </div>
        );
    }
}

export default FieldsetReference;