import React from 'react';

const AccountTab = React.createClass({
    render() {
        var accountId = this.props.params && this.props.params.account || -1;
        return (
            <div>This is an account tab for {accountId}</div>
        );
    }
});

export default AccountTab;