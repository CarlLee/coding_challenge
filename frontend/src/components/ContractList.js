import React, { Component } from 'react';
import './ContractList.css';

class ContractList extends Component {
  render() {
    let contracts = this.props.contracts
    return (
      <div className="ContractList">
        <div>Price: ${contract.amoundInUsd}</div>
        <div>Currency: {contract.currency}</div>
        <div>User: {contract.user.name} {contract.user.surname}</div>
        <div>Date: {contract.date}</div>
      </div>
    );
  }
}

export default ContractList;
