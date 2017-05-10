import React from 'react';
import ModalDialog from '../../utils/ModalDialog.jsx';
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
      accountId : -1,
      onAccountModified: () => {}
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
    console.log(`delete accountid ${this.state.accountId}`);
    this.setDeleteModalEnabled(false);
  },
  onAbort() {
    console.log('modal dialog aborted');
    this.setDeleteModalEnabled(false);
  },
  render() {
    let accountId = this.state.accountId;
    let modal = <ModalDialog onAccept={this.onDelete} onAbort={this.onAbort} header='Really delete?' 
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