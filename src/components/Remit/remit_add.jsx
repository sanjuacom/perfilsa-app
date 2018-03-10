import React, { Component } from 'react';
import axios from 'axios';
import FieldsetReference from '../fieldsetReference';
import FieldDate from '../field_date';

class RemitAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
          title: '',
          field_refer_receptor: '',
          success: '',
          error: '',
          csrfToken: '',
          fieldsetReference: [],
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        // Add button for new reference fieldset/
        this.addFieldset = this.addFieldset.bind(this);
    }

    // Add element.
    addFieldset() {
        const fieldsetReference = this.state.fieldsetReference.concat(FieldsetReference);
        this.setState({ fieldsetReference });
    }

    //When the NewFormNode mounts to the DOM, make a request for the CSRF Token and saves the token to the Form’s state
    componentWillMount(){
        let self= this;          
        axios.get('http://perfilsa.dev.dd:8083/rest/session/token')
        .then(function (response){
            const csrf_token = response.data;
            self.setState({'csrfToken': csrf_token});
        })
        .catch(function (error){
            console.log(error);
        });
    }

    handleChange(event) {
        const key = event.target.name;
        const value = event.target.value;
    
        this.setState({
          [key]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
    
        var self = this;
        var config = {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': this.state.csrfToken
          }
        }
    
        axios.post('http://perfilsa.dev.dd:8083/node?_format=json', {
          type: [{"target_id": "refer","target_type": "node_type"}],
          field_refer_receptor: [{"target_id": this.state.field_refer_receptor, "target_type": "user", "url": "/user/" + this.state.field_refer_receptor}],
          title: [{"value": this.state.title}],
        }, config)
        .then(function (response) {
          self.setState({
            'success': 'Nuevo remito generado exitosamente.',
            'error': ''
          });
        })
    
        .catch(function (error) {
          var errorResponse = error.response.data.message;
          errorResponse = errorResponse.replace(/(?:\r\n|\r|\n)/g, '<br />');
    
          self.setState({
            'success': '',
            'error': errorResponse
          });
        });
      }

    render(){
        // Add variable for fieldset
        const fieldsetReference = this.state.fieldsetReference.map((Element, index) => {
            return <Element key={ index } index={ index } />
        });

        return(
            <div className="row top-buffer">
                <div className="col">
                    <form className="col-md-6 offset-md-3 text-center" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Nro de Remito:</label>
                            <input name="title" value={this.state.title} onChange={this.handleChange} required type="textfield" size="15" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Nro de Orden:</label>
                            <input name="orden" value={this.state.orden} onChange={this.handleChange} required type="textfield" size="15" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Fecha:</label>
                            <FieldDate/>
                        </div>
                        <div className="form-group">
                            <label>Transporte:</label>
                            <input name="transport" value={this.state.transport} onChange={this.handleChange} required type="textfield" className="form-control" size="40" placeholder="Rodolfo" />
                        </div>
                        <div className="form-group">
                            <label>Pañol Proveniente:</label>
                            <input name="field_refer_receptor" value={this.state.field_refer_receptor} onChange={this.handleChange} required type="textfield" className="form-control" size="40" placeholder="Ingrese Pañol Receptor" />
                        </div>
                        <div className="form-group">
                            <label>Detalle:</label>
                            <textarea name="detail" value={this.state.detail} onChange={this.handleChange} required type="textarea" className="form-control" rows="5" />
                        </div>
                        <div className="form-group">
                            <button onClick={ this.addFieldset }>Agregar Herramienta/Elemento</button>
                            { fieldsetReference }
                        </div>
                        
                        <button type="submit" className="btn btn-primary">Send message</button>
                        <div className="form-group messages">
                        <p className="success">{this.state.success}</p>
                        <p className="error" dangerouslySetInnerHTML={{__html: this.state.error}} />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default RemitAdd