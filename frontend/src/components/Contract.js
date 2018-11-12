import React, { Component } from 'react';
import './Contract.css';

class Contract extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inEditMode: false,
      contract: props.contract
    }
    this.onDelete = this.onDelete.bind(this)
    this.onSave = this.onSave.bind(this)
    this.toggleUpdate = this.toggleUpdate.bind(this)
    this.makeUpdateCallback = this.makeUpdateCallback.bind(this)
    this.onChangeName = this.onChangeName.bind(this)
  }

  componentWillReceiveProps(nextProps){
    // Updates incoming
    this.setState({
      inEditMode: false,
      contract: nextProps.contract
    })
  }

  onDelete(e) {
    this.props.deleteContract(this.props.contract)
    e.preventDefault()
  }

  onSave(e) {
    this.props.updateContract(this.state.contract)
    e.preventDefault()
  }

  toggleUpdate(e) {
    this.setState({
      inEditMode: !this.state.inEditMode
    })
    e.preventDefault()
  }

  makeUpdateCallback(field) {
    let that = this
    return function(e) {
      let contract = that.state.contract
      contract[field] = e.target.value
      that.setState({
        contract: contract
      })
    }
  }

  onChangeName(e) {
    let splits = e.target.value.split(' ')
    if(splits.length > 0) {
      let name = splits[0]
      let surname
      if(splits.length > 1) {
        surname = splits[1]
      }

      this.setState({
        contract: {
          name: name,
          surname: surname
        }
      })
    }
  }

  render() {
    if(this.state.inEditMode) {
      return (
        <div className="Contract row">
          <input type="text" value={this.state.contract.amountInUsd} onChange={this.makeUpdateCallback('amountInUsd')} />
          <input type="text" value={this.state.contract.currency} onChange={this.makeUpdateCallback('currency')} />
          <input type="text" value={this.state.contract.user.name + ' ' + this.state.contract.user.surname} onChange={this.onChangeName} />
          <input type="text" value={this.state.contract.date} onChange={this.makeUpdateCallback('date')} />
          <div><button onClick={this.onSave}>Save</button> <button onClick={this.toggleUpdate}>Cancel</button></div>
        </div>
      )
    } else {
      return (
        <div className="Contract row">
          <div>${this.props.contract.amountInUsd}</div>
          <div>{this.props.contract.currency}</div>
          <div>{this.props.contract.user.name} {this.props.contract.user.surname}</div>
          <div>{this.props.contract.date}</div>
          <div><button onClick={this.onDelete}>Delete</button> <button onClick={this.toggleUpdate}>Update</button></div>
        </div>
      )
    }
  }
}

export default Contract;
