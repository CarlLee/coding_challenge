import React, { Component } from 'react';
import Contract from './Contract'
import './ContractList.css';

class ContractList extends Component {
  render() {
    let contracts = this.props.contracts.map((contract) => <Contract key={contract.id} contract={contract}/>)
    return (
      <div className="ContractList">
        {contracts}
      </div>
    );
  }
}

export default ContractList;
