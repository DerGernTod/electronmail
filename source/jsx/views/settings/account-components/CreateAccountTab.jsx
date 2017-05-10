import React from 'react';
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
      name: '',
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
    let { name, address, password, host, port, secure } = this.state;
    addAccount({
      id: Date.now(), 
      name,
      address,
      password,
      host,
      port,
      secure
    })
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
  handleTextChange(element, evt) {
    this.setState({
      ...this.state,
      [element]: evt.target.type == 'checkbox' ? evt.target.checked : evt.target.value,
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
            {this.createInput('name', 'text', 'Account name')}
            {this.createInput('address', 'email', 'Address')}
            {this.createInput('password', 'password', 'Password')}
            {this.createInput('host', 'text', 'Host')}
            {this.createInput('port', 'number', 'Port')}
            {this.createInput('secure', 'checkbox', 'Secure')}
            <button onClick={this.sendTestMail} disabled={this.state.mailCheckRunning}>{buttonText}</button>
            <input type='submit' value='Create account' />
          </fieldset>
        </form>
      </div>
    );
  }
});
export default CreateAccountTab;