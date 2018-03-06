import React, { Component } from 'react';
import axios from 'axios';

import {
  NavLink
} from 'react-router-dom';

class Tools extends Component {

  constructor() {
    super();
    this.state = {
      tools: [],
      tool_title: '',
      tool_body: '',
      keyword: ''
    };

    this.updateSearchKeyword = this.updateSearchKeyword.bind(this);
    this.updateSelectedTool = this.updateSelectedTool.bind(this);
  }

  updateSearchKeyword(event) {
    this.setState({
      'keyword': event.target.value
    })
  }

  updateSelectedTool(event) {
    this.fetchTool(event.target.getAttribute('data-value'));
  }

  fetchTool(id) {
    if (id === undefined) {
      id = 13;
    }
    else if (this.props.match.params.id !== undefined) {
      id = this.props.match.params.id;
    }

    var self = this;
    this.serverRequest = axios.get('http://perfilsa.dev.dd:8083/node/' + id + '?_format=json')
    .then(function(result){
      var body = result.data.body["0"].value;
      self.setState({
        tool_title: result.data.title["0"].value,
        tool_body: body.replace('/sites/default/files', 'http://druact-api.goran.cloud/sites/default/files')
      });
    })
  }

  fetchToolTitles() {
    var self = this;
    this.serverRequest = axios.get('http://perfilsa.dev.dd:8083/api/v1/tools')
    .then(function(result){
      self.setState({
        tools: result.data
      });
    })
  }

  componentDidMount () {
    this.fetchToolTitles();
    this.fetchTool();
  }

  render(){

    var rows = [];
    var self = this;
    this.state.tools.forEach(function(tool, index) {
      if (tool.title.toLowerCase().indexOf(self.state.keyword.toLowerCase()) !== -1) {
        var path = '/tools/' + tool.id;
        rows.push(<NavLink key={tool.id} data-value={tool.id} onClick={self.updateSelectedTool} to={path} className="list-group-item list-group-item-action">{tool.title}</NavLink>);
      }
    });

    return (
      <div className="row top-buffer">
        <div className="col-md-4">
          <form>
            <div className="form-group">
              <input name="keyword" value={this.state.keyword} onChange={this.updateSearchKeyword} type="text" className="form-control" placeholder="Buscar herramienta/elemento" />
            </div>
          </form>
          <div className="list-group">
            {rows}
          </div><br />
        </div>
        <div className="col-md-8">
          <div className="card text-center">
            <div className="card-header">
              {this.state.tool_title}
            </div>
            <div className="card-block" dangerouslySetInnerHTML={{__html: this.state.tool_body}} />
            <div className="card-footer text-muted text-left">
              <em><small>By Matias Torres.</small></em>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tools
