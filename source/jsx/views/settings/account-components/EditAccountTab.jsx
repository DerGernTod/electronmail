import React from 'react';
import ModalDialog from '../../utils/ModalDialog.jsx';
import { deleteAccount } from '../../../service/accounts';
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
      accountId: -1,
      onAccountModified: () => {},
      modalSpinEnabled: false
    };
  },
  componentWillReceiveProps(newProps) {
    this.setState({
      ...this.state,
      accountId: newProps.accountId
    });
  },
  setDeleteModalEnabled(enabled) {
    this.setState({
      ...this.state,
      deleteModalEnabled: enabled
    });
  },
  onDelete() {
    this.setState({
      ...this.state,
      modalSpinEnabled: true
    });
    deleteAccount(this.state.accountId)
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
    let accountId = this.state.accountId;
    let modal = <ModalDialog spinEnabled={this.state.modalSpinEnabled} onAccept={this.onDelete} onAbort={this.onAbort} header='Really delete?' 
          message={`Do you really want to delete account ${accountId}?`} enabled={this.state.deleteModalEnabled} />;
    return (
      <div className='contentpane-container'>
        <h2>Edit account No. {accountId}</h2>
        {modal}
        <button onClick={() => this.setDeleteModalEnabled(true)}>Delete</button>
      </div>
    );
  }
});
export default EditAccountTab;