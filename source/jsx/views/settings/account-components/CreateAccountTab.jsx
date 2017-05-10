import React from 'react';
import { changePassword } from '../../../service/crypto';
import { addAccount, findAccount } from '../../../service/accounts';
import sendMail from '../../../service/mails';
import { hashHistory } from 'react-router';
import Constants from '../../../constants';
let CreateAccountTab = React.createClass({  
  propTypes: {
    params: React.PropTypes.object,
    onAccountCreated: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      params: {
        account : -1
      },
      onAccountCreated: () => {}
    };
  },
  getInitialState() {
    return {
      value: '', 
      formEnabled: true,
      accountName: '',
      address: '',
      password: '',
      host: '',
      port: '',
      secure: true,
      mailCheckSuccessful: undefined,
      mailCheckRunning: false
    };
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
      this.props.onAccountCreated(id);
    })
    .catch(err => 
      this.setState({
        ...this.state,
        formEnabled: true,
        error: err
      })
    );
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
      [element]: evt.target.value,
      mailCheckSuccessful: undefined
    });
  },
  sendTestMail() {
    this.setState({
      ...this.state,
      mailCheckRunning: true
    });
    sendMail(this.state)
    .then(response => Promise.resolve(true))
    .catch(error => {
      console.error('Error sending mail', error);
      return Promise.resolve(false);
    })
    .then(success => this.setState({
      ...this.state,
      mailCheckSuccessful: success,
      mailCheckRunning: false
    }));
  },
  createInput(name, type, title) {
    return (
      <div className='flex'>
        <label htmlFor={`account-input-${name}`}>{title}</label>
        <input id={`account-input-${name}`} type={type} 
          value={this.state[name]} 
          onChange={this.handleTextChange.bind(this, name)} />
      </div>
    );
  },
  render() {
    let buttonText = 'Send testmail';
    if (typeof this.state.mailCheckSuccessful == 'boolean') {
      buttonText = (this.state.mailCheckSuccessful ? 'Success!' : 'Failed!') + ' Retry?';
    }
    return (
      <div className='contentpane-container'>
        <h2>Create new Account</h2>
        <form onSubmit={this.handleAccountCreated}>
          <fieldset disabled={!this.state.formEnabled} className='flex'>
            {this.createInput('accountName', 'text', 'Account name')}
            {this.createInput('address', 'email', 'Address')}
            {this.createInput('password', 'password', 'Password')}
            {this.createInput('host', 'text', 'Host')}
            {this.createInput('port', 'number', 'Port')}
            {this.createInput('secure', 'checkbox', 'Secure')}
            <button onClick={this.sendTestMail} disabled={this.state.mailCheckRunning}>{buttonText}</button>
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
  }
});
export default CreateAccountTab;