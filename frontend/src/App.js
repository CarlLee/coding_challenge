import React, { Component } from 'react';
import './App.css';
import ContractList from './components/ContractList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contracts: [],
      page: 0
    }
  }
  componentDidMount() {
    let that = this
    fetch(`http://localhost:8000/contracts?_page=${this.state.page}&_limit=20`)
      .then(res => res.json())
      .then(function(result) {
        that.setState({
          contracts: result
        })
      })
  }
  render() {
    return (
      <div className="App">
        <ContractList contracts={this.state.contracts} />
      </div>
    );
  }
}

export default App;
