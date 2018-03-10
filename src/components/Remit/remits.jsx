import React, { Component } from 'react';
import axios from 'axios';

class Remits extends Component {
    constructor() {
        super();
        this.state = {
            remits: [],
        };
    }

    fetchData() {
        var self = this;
        this.serverRequest = axios.get('http://perfilsa.dev.dd:8083/api/v1/list?_format=json',{
            params: { type: "refer", limit: 100}
        })
        .then(function(result){
            self.setState({
            remits: result.data
            });
        });
    }
    componentDidMount () {
        this.fetchData();
    }

    render() {
        var rows = [];
        this.state.remits.forEach(function(remit, index) {
            rows.push(remit.title);
        });

        return (
            <div className="row top-buffer">
                <div className="list-group">
                    {rows}
                </div>    
            </div>
        )
    }
}

export default Remits;