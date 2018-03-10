import React, { Component } from 'react';
import axios from 'axios';

class ToolAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
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
      type: [{"target_id":"tool","target_type":"node_type"}],
      title: [{"value": this.state.title}],
      body: [{"value": this.state.body}],
    }, config)
    .then(function (response) {
      self.setState({
        'success': 'Node saved',
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
    return (
      <div className="row top-buffer">
        <div className="col">
          <form className="col-md-6 offset-md-3 text-center" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input name="title" value={this.state.title} onChange={this.handleChange} required type="textfield" className="form-control" placeholder="Enter title" />
            </div>
            <div className="form-group">
              <textarea name="body" value={this.state.body} onChange={this.handleChange} required className="form-control" rows="5" placeholder="Enter body message"></textarea>
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

export default ToolAdd;
