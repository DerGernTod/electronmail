import * as React from 'react';
import './styles/inputs.less';
import ModalDialog from '../../utils/ModalDialog';
import { deleteAccount, findAccount, updateAccount, addAccount } from 'service/accounts';
import sendMail from 'service/mails';
import { HashRouter, withRouter, RouteComponentProps } from 'react-router-dom';
import Constants, { AuthType } from '../../../../constants';
import { authenticate, getNewTokenUrl, authenticateWithCode } from 'service/authentication/googleapi';

interface AccountTabRouterParams {
  account: string
}

export interface AccountTabProps extends RouteComponentProps<AccountTabRouterParams> {
  onAccountModified: (id?: number) => void;
  onAccountCreated: (id: number) => void;
}

interface AccountTabInputs {
  name: string;
  address: string;
  password: string;
  mailHost: string;
  mailPort: number;
  mailSecure: boolean;
  authType: AuthType;
  oAuthCode: string;
  smtpHost: '';
  smtpPort: number;
  smtpSecure: boolean;
}

interface AccountTabState {
  id: number;
  formInputs: AccountTabInputs;
  onAccountModified: () => void;
  modalSpinEnabled: boolean;
  mailCheckSuccessful: undefined | boolean;
  formEnabled: boolean;
  authenticationRequired: boolean;
  error: string;
  deleteModalEnabled: boolean;
}

class AccountTab extends React.Component<AccountTabProps, AccountTabState> {
  private isUnmounted = true;
  getDefaultProps() {
    return {
      onAccountModified: () => {},
      onAccountCreated: () => {}
    };
  }
  getInitialState(): AccountTabState {
    return {
      id: -1,
      formInputs: {
        name: '',
        address: '',
        password: '',
        mailHost: '',
        mailPort: 0,
        mailSecure: false,
        authType: AuthType.IMAP,
        oAuthCode: '',
        smtpHost: '',
        smtpPort: 0,
        smtpSecure: false
      },
      mailCheckSuccessful: void 0,
      onAccountModified: () => { },
      modalSpinEnabled: false,
      formEnabled: false,
      authenticationRequired: false,
      error: '',
      deleteModalEnabled: false
    };
  }
  loadAccount(id: number) {
    findAccount(id)
    .then(account => {
      console.log('found account', account);
      if (account.authType == Constants.AUTH_TYPE_GOOGLE) {
        authenticate().catch(() => {
          this.setStateIfMounted({
            authenticationRequired: true,
            ...account
          });
        });
      } else {
        this.setStateIfMounted({
          ...account
        });
      }
    })
    .catch(() =>
      this.setStateIfMounted({
        id: -1
      })
    );
  }
  componentWillMount() {
    this.isUnmounted = false;
    this.loadAccount(Number(this.props.match.params.account));
  }
  componentWillReceiveProps(newProps: AccountTabProps) {
    this.loadAccount(Number(newProps.match.params.account));
  }
  componentWillUnmount() {
    this.isUnmounted = true;
  }
  handleTextChange(element: keyof AccountTabInputs, evt: Event) {
    const target = evt.target as HTMLInputElement;
    this.setState({
      formInputs: {
        ...this.state.formInputs,
        [element]: target.type == 'checkbox' ? target.checked : target.value,
      },
      mailCheckSuccessful: void 0
    });
  }
  setDeleteModalEnabled(enabled: boolean) {
    this.setState({
      deleteModalEnabled: enabled
    });
  }
  openAuthenticationWindow() {
    this.setState({
      authenticationRequired: true
    });
    window.open(getNewTokenUrl());
  }
  authenticate() {
    authenticateWithCode(this.state.formInputs.oAuthCode);
  }
  sendTestMail() {
    this.setState({
      formEnabled: true
    });
    sendMail(this.state)
      .then(() => Promise.resolve(true))
      .catch(error => {
        console.error('Error sending mail', error);
        return Promise.resolve(false);
      })
      .then(success => this.setStateIfMounted({
        mailCheckSuccessful: success,
        formEnabled: false
      }));
  }
  createInput(name: keyof AccountTabInputs, type: InputType, title: string, tabIndex: number, options?: string[]) {
    return (
      <fieldset key={`account-input-${tabIndex}`} className="form-fieldset ui-input"
        disabled={this.state.formEnabled} >
        {this.createElementInput(name, type, tabIndex, options)}
        <label htmlFor={`account-input-${name}`}>
          <span data-text={title}>{title}</span>
        </label>
      </fieldset>
    );
  }
  createElementInput(name: keyof AccountTabInputs, type: InputType, tabIndex: number, options?: string[]) {
    let id = `account-input-${name}`;
    let blurFunc = function () {
      const elem = document.getElementById(id) as HTMLInputElement;
      elem.classList.toggle('filled', !!elem.value);
    };
    switch(type) {
    case 'checkbox':
      return <input
        id={id}
        type={type}
        checked={this.state.formInputs[name] as boolean}
        onChange={this.handleTextChange.bind(this, name)}
        disabled={this.state.formEnabled}
        className={this.state.formInputs[name] ? 'filled' : ''}
        onBlur={blurFunc}/>;
    case 'select':
      return <select
        id={id}
        tabIndex={tabIndex}
        className={this.state.formInputs[name] ? 'filled' : ''}
        onBlur={blurFunc}
        onChange={this.handleTextChange.bind(this, name)}
        value={this.state.formInputs[name] as string}>
          {options && options.map(elem => <option key={`${name}-option-${elem}`}>{elem}</option>)}
        </select>;
    default:
      return <input
        type={type}
        id={id}
        tabIndex={tabIndex}
        className={this.state.formInputs[name] ? 'filled' : ''}
        onBlur={blurFunc}
        value={this.state.formInputs[name] as string}
        onChange={this.handleTextChange.bind(this, name)} />;
    }
  }
  onDelete() {
    this.setState({
      modalSpinEnabled: true
    });
    deleteAccount(this.state.id)
      .then(numDeleted => { console.log(`Deleted ${numDeleted} accounts`); })
      .catch(error => { console.log('Error during deletion: ', error); })
      .then(() => {
        this.setStateIfMounted({
          modalSpinEnabled: false
        });
        this.setDeleteModalEnabled(false);

        this.props.history.push(`${Constants.ROUTES.accounts}/-1`);
        this.props.onAccountModified();
      });
  }
  setStateIfMounted<K extends keyof AccountTabState>(newState: Pick<AccountTabState, K>) {
    if (!this.isUnmounted) {
      this.setState(newState);
    }
  }
  onAbort() {
    this.setDeleteModalEnabled(false);
  }
  handleFormSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    let { id } = this.state;
    let { name, address, mailHost: host, mailPort: port, password, mailSecure: secure } = this.state.formInputs;
    this.setState({
      formEnabled: false
    });
    if (id >= 0) {
      updateAccount({id, name, address, host, port, password, secure})
      .then(numReplaced => {
        console.log(`Updated ${numReplaced} entries`);
        this.props.onAccountModified();
      })
      .catch(error => Promise.resolve(error))
      .then(error => this.setStateIfMounted({
        formEnabled: true,
        error
      }));
    } else {
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
        this.props.history.push(`${Constants.ROUTES.accounts}/${id}`);
        this.props.onAccountCreated(id);
      })
      .catch(error =>
        this.setStateIfMounted({
          formEnabled: true,
          error
        })
      );
    }
  }
  render() {
    let buttonText = 'Send testmail';
    if (typeof this.state.mailCheckSuccessful == 'boolean') {
      buttonText = (this.state.mailCheckSuccessful ? 'Success!' : 'Failed!') + ' Retry?';
    }
    let modal;
    let deleteButton;
    if (this.state.id >= 0) {
      deleteButton = <button type='button' onClick={() => this.setDeleteModalEnabled(true)}>Delete</button>;
      modal = <ModalDialog spinEnabled={this.state.modalSpinEnabled} onAccept={this.onDelete} onAbort={this.onAbort} header='Really delete?'
      message={`Do you really want to delete account '${this.state.formInputs.name}'?`} enabled={this.state.deleteModalEnabled} />;
    }
    let availableInputs = [
    ];
    let title = 'POP';

    switch (this.state.formInputs.authType) {
    case AuthType.IMAP:
      title = 'IMAP';
      // falls through
    case AuthType.POP:
      availableInputs.push(
        this.createInput('address', 'email', 'Address', 2),
        this.createInput('password', 'password', 'Password', 3),
        this.createInput('smtpHost', 'text', 'SMTP Host', 4),
        this.createInput('smtpPort', 'number', 'SMTP Port', 5),
        this.createInput('smtpSecure', 'checkbox', 'SMTP Secure', 6),
        this.createInput('mailHost', 'text', `${title} Host`, 7),
        this.createInput('mailPort', 'number', `${title} Port`, 8),
        this.createInput('mailSecure', 'checkbox', `${title} Secure`, 9)
      );
      break;
    case AuthType.Google:
      var authText = 'Start';
      if (!this.state.authenticationRequired) {
        authText = 'Clear';
        availableInputs.push(<div>Authentication completed!</div>);
      }
      availableInputs.push(
        <button type='button' key='authButton' onClick={() => this.openAuthenticationWindow()} disabled={this.state.formEnabled}>
          {authText} authentication
        </button>
      );
      if (this.state.authenticationRequired) {
        availableInputs.push(
          this.createInput('oAuthCode', 'text', 'Authentication code', 2),
          <button disabled={this.state.formEnabled} type='button' key='acceptAuthButton' onClick={() => this.authenticate()}>
            Authenticate
          </button>
        );
      }
      break;
    }
    return (
      <div className='contentpane-container'>
        <h2>{this.state.id > 0 ? `Edit ${this.state.formInputs.name}` : 'Create Account'}</h2>
        {modal}
        <form className='flex' onSubmit={(evt: React.FormEvent) => this.handleFormSubmit(evt)}>
          {this.createInput('name', 'text', 'Account name', 0)}
          {this.createInput('authType', 'select', 'Authentication Type', 1, Constants.AUTHENTICATION_TYPES)}
          {availableInputs}
          <div className='flex space-between'>
            <button type='button' onClick={this.sendTestMail} disabled={this.state.formEnabled}>{buttonText}</button>
            <input type='submit' value={this.state.id >= 0 ? 'Save changes' : 'Create account'} disabled={this.state.formEnabled} />
            {deleteButton}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(AccountTab);
