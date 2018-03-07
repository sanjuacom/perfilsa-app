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
    axios.get('http://perfilsa.dev.dd:8083/api/v1/remito?_format=json',
     {params: { search: search }}
    ).then(res => {
        const options = res.data;
        this.setState({ options });
      });
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  render() {
    const listOptions = this.state.options;
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;

    return (
      <Select
        name="form-field-reference"
        value={value}
        onChange={this.handleChange}
        options={listOptions}
      />
    );
  }
}

export default Reference;