import React from 'react';
import { changePassword } from '../../../service/crypto';
import { findMails } from '../../../service/nedb';
import { addAccount, findAccount } from '../../../service/accounts';
import { hashHistory } from 'react-router';
import Constants from '../../../constants';
import ModalDialog from '../../utils/ModalDialog.jsx';
const AccountTab = React.createClass({
  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
    params: React.PropTypes.object,
    onAccountCreated: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      children: [],
      params: {
        account : -1
      },
      onAccountCreated: () => {}
    };
  },
  getInitialState() {
    return { 
      connected: false, 
      value: '', 
      formEnabled: true,
      accountName: '',
      address: '',
      accountId: this.props.params.account
    };
  },
  
  componentDidMount() {
    let accountId = this.props.params.account;
    if (accountId >= 0) {
      findAccount(accountId)
      .then(account => 
        this.setState({
          connected: true,
          data: account
        })
      )
      .catch(err => 
        this.setState({
          connected : true,
          data : err
        })
      );
    }
  },
  handleDbPasswordTextField(evt) {
    this.setState({
      value : evt.target.value
    });
  },
  handlePasswordChange(evt) {
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
  handleTextChange(element, evt) {
    this.setState({
      ...this.state,
      [element]: evt.target.value
    });
  },
  handleAccountCreated(evt) {
    evt.preventDefault();
    this.setState({
      ...this.state,
      formEnabled: false
    });
    addAccount({id: Date.now(), name: this.state.accountName, address: this.state.address})
    .then(id => {
      hashHistory.push(`${Constants.ROUTES.accounts}/${id}`);
      this.props.onAccountCreated();
    })
    .catch(err => 
      this.setState({
        ...this.state,
        formEnabled: true,
        error: err
      })
    );
  },
  getCreateJsx() {
    return (
      <div className='contentpane-container'>
        <h2>Create new Account</h2>
        <div>Connected: {JSON.stringify(this.state.connected)}</div>    
        <div>Data: {JSON.stringify(this.state.data || 'no data yet')}</div>
        <form onSubmit={this.handleAccountCreated}>
          <fieldset disabled={!this.state.formEnabled}>
            <label htmlFor='accountName'>Account name</label>
            <input id='accountName' type='text' value={this.state.accountName} onChange={this.handleTextChange.bind(this, 'accountName')} />
            <label htmlFor='address'>Address</label>
            <input id='address' type='email' value={this.state.address} onChange={this.handleTextChange.bind(this, 'address')} />
            <input type='submit' value='Create account' />
          </fieldset>
        </form>
        <hr />
        <h3>Change DB Encoding Password</h3>
        <form onSubmit={this.handlePasswordChange}>
          <input type='text' value={this.state.value} onChange={this.handleDbPasswordTextField} />
          <input type='submit' value='Change db pass' />
        </form>
        {this.state.changeDuration && `Changing db password took ${this.state.changeDuration.toFixed(2)}ms`}
      </div>
    );
  },
  getEditJsx(accountId) {
    let modal = <ModalDialog onAccept={this.onDelete} onAbort={this.onAbort} header='Really delete?' 
          message={`Do you really want to delete account ${accountId}?`} enabled={this.state.deleteModalEnabled} />;
    return (
      <div className='contentpane-container'>
        <h2>Edit account No. {accountId}</h2>
        {modal}
        <button onClick={() => this.setDeleteModalEnabled(true)}>Delete</button>
      </div>
    );
  },
  onDelete() {
    console.log(`delete accountid ${this.state.accountId}`);
    this.setDeleteModalEnabled(false);
  },
  onAbort() {
    console.log('modal dialog aborted');
    this.setDeleteModalEnabled(false);
  },
  setDeleteModalEnabled(enabled) {
    this.setState({
      ...this.state,
      deleteModalEnabled: enabled
    });
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