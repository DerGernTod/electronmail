import React from 'react';
import EditAccountTab from './EditAccountTab.jsx';
import CreateAccountTab from './CreateAccountTab.jsx';
const AccountTab = React.createClass({
  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
    params: React.PropTypes.object,
    onAccountCreated: React.PropTypes.func,
    onAccountModified: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      params: {
        account : -1
      },
      onAccountCreated: () => {},
      onAccountModified: () => {}
    };
  },
  render() {
    var accountId = Number(this.props.params.account);
    if (isNaN(accountId)) {
      return (<div></div>);
    }
    if (accountId < 0) {
      return <CreateAccountTab onAccountCreated={this.props.onAccountCreated} />;
    }
    return <EditAccountTab accountId={accountId} onAccountModified={this.props.onAccountModified} />;
  }
});

export default AccountTab;