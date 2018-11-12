import React, { Component } from 'react';
import './Contract.css';

class Contract extends Component {
  constructor(props) {
    super(props)
    this.onDelete = this.onDelete.bind(this)
  }
  onDelete(e) {
    this.props.deleteContract(this.props.contract)
    e.preventDefault()
  }
  render() {
    let contract = this.props.contract
    return (
      <div className="Contract row">
        <div>${contract.amountInUsd}</div>
        <div>{contract.currency}</div>
        <div>{contract.user.name} {contract.user.surname}</div>
        <div>{contract.date}</div>
        <div><button onClick={this.onDelete}>Delete</button> <button>Update</button></div>
      </div>
    );
  }
}

export default Contract;
