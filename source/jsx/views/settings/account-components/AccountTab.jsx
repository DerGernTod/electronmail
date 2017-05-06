import React from 'react';
import { changePassword } from '../../../service/crypto';
import { findMails } from '../../../service/nedb';
const AccountTab = React.createClass({
  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
    params: React.PropTypes.object
  },
  getDefaultProps() {
    return {
      children: [],
      params: {
        account : -1
      }
    };
  },
  getInitialState() {
    return { connected: false, value: '' };
  },
  componentDidMount() {
    findMails({})
    .then(result => 
      this.setState({
        connected : true,
        data : result
      })
    ).catch(err => 
      this.setState({
        connected : true,
        data : err
      })
    );
  },
  handleChange(evt) {
    this.setState({
      value : evt.target.value
    });
  },
  handleSubmit(evt) {
    evt.preventDefault();
    let before = performance.now();
    changePassword(this.state.value)
    .then(() => 
      this.setState({
        ...this.state,
        changeDuration : performance.now() - before
      })
    )
    .catch(err => 
      this.setState({
        ...this.state,
        changeDuration : 'error: ' + err
      })
    );
  },
  getCreateJsx() {
    return (
      <div className='contentpane-container'>
        <h2>Create new Account</h2>
        <div>Connected: {JSON.stringify(this.state.connected)}</div>    
        <div>Data: {JSON.stringify(this.state.data || 'no data yet')}</div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' value={this.state.value} onChange={this.handleChange} />
          <input type='submit' value='Change db pass' />
        </form>
        {this.state.changeDuration && `Changing db password took ${this.state.changeDuration.toFixed(2)}ms`}
      </div>
    );
  },
  getEditJsx(accountId) {
    return (
      <div className='contentpane-container'>
        <h2>Edit account No. {accountId}</h2>
      </div>
    );
  },
  render() {
    var accountId = this.props.params.account;
    if (isNaN(accountId)) {
      return (<div></div>);
    }
    if (accountId < 0) {
      return this.getCreateJsx();
    }
    return this.getEditJsx(accountId);
  }
});

export default AccountTab;