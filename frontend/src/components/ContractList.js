import React, { Component } from 'react';
import Contract from './Contract'
import './ContractList.css';

class ContractList extends Component {
  render() {
    let contracts = this.props.contracts.map((contract) => {
        return <Contract
          deleteContract={this.props.deleteContract} 
          updateContract={this.props.updateContract} 
          key={contract.id} 
          contract={contract}/>
        })
    return (
      <div className="ContractList table">
        <div className="row">
          <div>Price</div>
          <div>Currency</div>
          <div>User</div>
          <div>Date</div>
          <div></div>
        </div>
        {contracts}
      </div>
    );
  }
}

export default ContractList;
