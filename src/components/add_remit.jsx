import React, { Component } from 'react';
import axios from 'axios';
import Reference from './reference';

class AddRemit extends Component {

    constructor(props) {
        super(props);
        this.state = {
          title: '',
          field_refer_receptor: '',
          success: '',
          error: '',
          csrfToken: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        return(
            <div className="row top-buffer">
                <div className="col">
                    <form className="col-md-6 offset-md-3 text-center" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input name="title" value={this.state.title} onChange={this.handleChange} required type="textfield" className="form-control" placeholder="Enter title" />
                        </div>
                        <div className="form-group">
                            <input name="field_refer_receptor" value={this.state.field_refer_receptor} onChange={this.handleChange} required type="textfield" className="form-control" placeholder="Enter receptor" />
                        </div>
                        <div className="form-group">
                            <Reference />
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

export default AddRemit