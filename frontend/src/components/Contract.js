import React, { Component } from 'react';
import './Contract.css';

class Contract extends Component {
  render() {
    let contract = this.props.contract
    return (
      <div className="Contract">
        <div>Price: ${contract.amountInUsd}</div>
        <div>Currency: {contract.currency}</div>
        <div>User: {contract.user.name} {contract.user.surname}</div>
        <div>Date: {contract.date}</div>
      </div>
    );
  }
}

export default Contract;
