import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(this.state.page !== this.props.page) {
      this.setState({
        page: nextProps.page
      })
    }
  }

  onFormSubmit(e) {
    let page = parseInt(this.state.page)
    if(!isNaN(page)) {
      this.props.navigateToPage(page)
    }
    e.preventDefault()
  }

  onPageChange(e) {
    this.setState({
      page: e.target.value
    })
  }

  render() {
    return (
      <div className="Footer">
        <button onClick={this.props.navigateToFirst}>First</button>
        <button onClick={this.props.navigateToPrev}>Prev</button>
        <form onSubmit={this.onFormSubmit}><input type="text" value={this.state.page} onChange={this.onPageChange} /></form>
        <button onClick={this.props.navigateToNext}>Next</button>
      </div>
    )
  }
}

export default Footer;
