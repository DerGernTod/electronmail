import React from 'react';
import ModalDialog from '../../utils/ModalDialog.jsx';
import { deleteAccount, findAccount } from '../../../service/accounts';
import sendMail from '../../../service/mails';
import { hashHistory } from 'react-router';
import Constants from '../../../constants';
let EditAccountTab = React.createClass({
  propTypes: {
    accountId: React.PropTypes.number,
    onAccountModified: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      accountId : -1
    };
  },
  getInitialState() {
    return {
      id: -1,
      name: '',
      address: '',
      host: '',
      port: '',
      password: '',
      secure: false,
      onAccountModified: () => {},
      modalSpinEnabled: false,
      formEnabled: true,
      mailCheckSuccessful: undefined,
      mailCheckRunning: false
    };
  },
  componentWillReceiveProps(newProps) {
    
    findAccount(newProps.accountId)
    .then(account => {
      console.log('found account', account);
      this.setState({
        ...this.state,
        ...account
      });
    })
    .catch(error => 
      this.setState({
        ...this.state,
        id : 'Invalid id. no account with this id found!'
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
  setDeleteModalEnabled(enabled) {
    this.setState({
      ...this.state,
      deleteModalEnabled: enabled
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
      <div className='flex space-between align-items-center'>
        <label htmlFor={`account-input-${name}`}>{title}</label>
        {this.createElementInput(name, type)}
      </div>
    );
  },
  createElementInput(name, type) {
    let id = `account-input-${name}`;
    if (type == 'checkbox') {
      return <input id={id} type={type} 
          checked={this.state[name]} 
          onChange={this.handleTextChange.bind(this, name)} />;
    } else {
      return <input id={id} type={type} 
          value={this.state[name]} 
          onChange={this.handleTextChange.bind(this, name)} />;
    }
  },
  onDelete() {
    this.setState({
      ...this.state,
      modalSpinEnabled: true
    });
    deleteAccount(this.state.id)
    .then(numDeleted => { console.log(`Deleted ${numDeleted} accounts`); })
    .catch(error => { console.log('Error during deletion: ', error); })
    .then(() => {
      this.setState({
        ...this.state,
        modalSpinEnabled: false
      });
      this.setDeleteModalEnabled(false);

      hashHistory.push(`${Constants.ROUTES.accounts}/-1`);
      this.props.onAccountModified();
    });
  },
  onAbort() {
    console.log('modal dialog aborted');
    this.setDeleteModalEnabled(false);
  },
  render() {
    let buttonText = 'Send testmail';
    if (typeof this.state.mailCheckSuccessful == 'boolean') {
      buttonText = (this.state.mailCheckSuccessful ? 'Success!' : 'Failed!') + ' Retry?';
    }
    let modal = <ModalDialog spinEnabled={this.state.modalSpinEnabled} onAccept={this.onDelete} onAbort={this.onAbort} header='Really delete?' 
          message={`Do you really want to delete account '${this.state.name}'?`} enabled={this.state.deleteModalEnabled} />;
    return (
      <div className='contentpane-container'>
        <h2>Edit {this.state.name}</h2>
        <form onSubmit={this.handleAccountModified}>
          <fieldset disabled={!this.state.formEnabled} className='flex'>
            {this.createInput('name', 'text', 'Account name')}
            {this.createInput('address', 'email', 'Address')}
            {this.createInput('password', 'password', 'Password')}
            {this.createInput('host', 'text', 'Host')}
            {this.createInput('port', 'number', 'Port')}
            {this.createInput('secure', 'checkbox', 'Secure')}
            <div className='flex space-between'>
              <button onClick={this.sendTestMail} disabled={this.state.mailCheckRunning}>{buttonText}</button>
              <input type='submit' value='Create account' />
            </div>
          </fieldset>
        </form>
        {modal}
        <button onClick={() => this.setDeleteModalEnabled(true)}>Delete</button>
      </div>
    );
  }
});
export default EditAccountTab;