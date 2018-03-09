import React, { Component } from 'react';
import Reference from './reference';

class FieldsetReference extends Component {
    render() {
        return(
            <div>
                <Reference />
                <input name="qty" type="textfield" />
            </div>
        );
    }
}

export default FieldsetReference;