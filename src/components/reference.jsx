import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Reference extends Component {
  state = {
    selectedOption: '',
    response: ''
  }
  constructor(props) {
    super(props);

    this.state = {
      options: []
    };
  }

  componentDidMount(search = '') {
    axios.get('http://perfilsa.dev.dd:8083/api/v1/remito?_format=json').then(res => {
        const options = res.data;
        this.setState({ options });
      });
  }

  getOptions(search) {
    return axios.get('http://perfilsa.dev.dd:8083/api/v1/remito?_format=json',{
        params: { search: search}
    }).then(response => {
        return { options: response.data }
    })
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  render() {
    const listOptions = this.state.options;
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;

    return (
      <Select.Async
        name={`field-reference-${ this.props.qtyReference }`}
        value={value}
        onChange={this.handleChange}
        options={listOptions}
        loadOptions={ this.getOptions.bind(this) }
      />
    );
  }
}

export default Reference;