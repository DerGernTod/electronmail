import React from 'react';
import './inputs.less';
import ModalDialog from '../../utils/ModalDialog.jsx';
import { deleteAccount, findAccount, updateAccount, addAccount } from '../../../service/accounts';
import sendMail from '../../../service/mails';
import { hashHistory } from 'react-router';
import Constants from '../../../constants';
let AccountTab = React.createClass({
  propTypes: {
    params: React.PropTypes.object,
    onAccountModified: React.PropTypes.func,
    onAccountCreated: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      params: { account: -1 },
      onAccountModified: () => {},
      onAccountCreated: () => {}
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
      onAccountModified: () => { },
      modalSpinEnabled: false,
      mailCheckSuccessful: undefined,
      formEnabled: false
    };
  },
  componentWillReceiveProps(newProps) {

    findAccount(Number(newProps.params.account))
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
          id: 'Invalid id. no account with this id found!'
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
      formEnabled: true
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
        formEnabled: false
      }));
  },
  createInput(name, type, title) {
    return (
      <fieldset className="form-fieldset ui-input"
        disabled={this.state.formEnabled} >
        {this.createElementInput(name, type)}
        <label htmlFor={`account-input-${name}`}>
          <span data-text={title}>{title}</span>
        </label>
      </fieldset>
    );
  },
  createElementInput(name, type, tabIndex) {
    let id = `account-input-${name}`;
    let blurFunc = function () { var elem = document.getElementById(id); elem.classList.toggle('filled', !!elem.value); };
    if (type == 'checkbox') {
      return <input
        id={id}
        type={type}
        checked={this.state[name]}
        onChange={this.handleTextChange.bind(this, name)}
        disabled={this.state.formEnabled}
        className={this.state[name] ? 'filled' : ''}
        onBlur={blurFunc}/>;
    } else {
      return <input
        type={type}
        id={id}
        tabIndex={tabIndex}
        className={this.state[name] ? 'filled' : ''}
        onBlur={blurFunc}
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
  handleFormSubmit(evt) {
    evt.preventDefault();
    let {id, name, address, host, port, password, secure} = this.state;
    this.setState({
      ...this.state,
      formEnabled: false
    });
    if (id >= 0) {
      updateAccount({id, name, address, host, port, password, secure})
      .then(numReplaced => {
        console.log(`Updated ${numReplaced} entries`);
        this.props.onAccountModified();
      })
      .catch(error => Promise.resolve(error))
      .then(error => this.setState({
        ...this.state,
        formEnabled: true,
        error
      }));
    } else {
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
      .catch(error =>
        this.setState({
          ...this.state,
          formEnabled: true,
          error
        })
      );
    }
  },
  render() {
    let buttonText = 'Send testmail';
    if (typeof this.state.mailCheckSuccessful == 'boolean') {
      buttonText = (this.state.mailCheckSuccessful ? 'Success!' : 'Failed!') + ' Retry?';
    }
    let modal;
    let deleteButton;
    if (this.state.id >= 0) {
      deleteButton = <button onClick={() => this.setDeleteModalEnabled(true)}>Delete</button>;
      modal = <ModalDialog spinEnabled={this.state.modalSpinEnabled} onAccept={this.onDelete} onAbort={this.onAbort} header='Really delete?'
      message={`Do you really want to delete account '${this.state.name}'?`} enabled={this.state.deleteModalEnabled} />;
    }
    return (
      <div className='contentpane-container'>
        <h2>{this.state.id > 0 ? `Edit ${this.state.name}` : 'Create Account'}</h2>
        {modal}
        <form disabled={this.state.formEnabled} className='flex' onSubmit={this.handleFormSubmit}>
          {this.createInput('name', 'text', 'Account name', 0)}
          {this.createInput('address', 'email', 'Address', 1)}
          {this.createInput('password', 'password', 'Password', 2)}
          {this.createInput('host', 'text', 'Host', 3)}
          {this.createInput('port', 'number', 'Port', 4)}
          {this.createInput('secure', 'checkbox', 'Secure', 5)}
          <div className='flex space-between'>
            <button onClick={this.sendTestMail} disabled={this.state.formEnabled}>{buttonText}</button>
            <input type='submit' value={this.state.id >= 0 ? 'Save changes' : 'Create account'} />
            {deleteButton}
          </div>
        </form>
      </div>
    );
  }
});
export default AccountTab;
