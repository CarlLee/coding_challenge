import React, { Component } from 'react';
import './App.css';
import ContractList from './components/ContractList'
import Footer from './components/Footer'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contracts: [],
      page: 1
    }
    this.navigateToPage = this.navigateToPage.bind(this)
    this.navigateToFirst = this.navigateToFirst.bind(this)
    this.navigateToNext = this.navigateToNext.bind(this)
    this.navigateToPrev = this.navigateToPrev.bind(this)
    this.fetchContracts = this.fetchContracts.bind(this)
    this.deleteContract = this.deleteContract.bind(this)
  }

  componentDidMount() {
    this.fetchContracts()
  }

  deleteContract(contract) {

  }

  navigateToPage(page) {
    this.setState({
      page: Math.max(page, 1)
    }, this.fetchContracts)
  }

  navigateToFirst() {
    this.navigateToPage(1)
  }

  navigateToNext() {
    this.navigateToPage(this.state.page + 1)
  }

  navigateToPrev() {
    this.navigateToPage(this.state.page - 1)
  }

  fetchContracts() {
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
        <ContractList
          contracts={this.state.contracts}
          deleteContract={this.deleteContract} />
        <Footer
          navigateToFirst={this.navigateToFirst}
          navigateToPrev={this.navigateToPrev}
          navigateToPage={this.navigateToPage}
          navigateToNext={this.navigateToNext}
          page={this.state.page} />
      </div>
    );
  }
}

export default App;
