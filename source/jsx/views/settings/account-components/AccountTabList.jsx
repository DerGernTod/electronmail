import '../../content-pane-fade.less';
import './accounts.less';
import React from 'react';
import {Link} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {findAllAccounts} from '../../../service/accounts';
import Constants from '../../../constants';
const AccountTabList = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
    params: React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
      children: [],
      params: {
        account : -1
      }
    };
  },
  getInitialState(){
    return { accounts : [] };
  },

  componentDidMount(){
    this.updateAccountList();
  },
  buildAccountPreview(account){
    var linkTarget = `${Constants.ROUTES.accounts}/${account.id}`;

    return (
      <li key={account.id} id={`accounts-list-id-${account.id}`}>
        <Link to={linkTarget} activeClassName="active">
          <div className='author'>{account.name}</div>
          {account.address ? (<div className='title'>{account.address}</div>) : null}
        </Link>
      </li>
    );
  },
  updateAccountList(scrollToId) {
    findAllAccounts()
    .then(accounts => this.setState({ accounts: accounts.sort((a, b) => {
      return a.name.localeCompare(b.name);
    })}))
    .then(() => {
      let element = document.getElementById(`accounts-list-id-${scrollToId}`);
      element && element.scrollIntoViewIfNeeded();
    });
  },
  onAccountCreated(accountId) {
    this.updateAccountList(accountId);
  },
  onAccountModified(accountId) {
    this.updateAccountList(accountId);
  },
  render(){
    var accountsList = [];
    accountsList.push(this.buildAccountPreview({id: -1, name: 'Create account'}));
    this.state.accounts.forEach(mail => accountsList.push(this.buildAccountPreview(mail)));
    var mainKey = this.props.params.account;
    return (
      <div className='accounts'>
        <div className='account-tab-list float-left'>
          <ol>
            {accountsList}
          </ol>
        </div>
        <ReactCSSTransitionGroup
          component="div"
          className="contentpane float-left"
          transitionName="content-pane-fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppear={true}
          transitionAppearTimeout={500}>
          {React.cloneElement(this.props.children, {
            key: mainKey,
            onAccountCreated: this.onAccountCreated,
            onAccountModified: this.onAccountModified
          })}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

export default AccountTabList;
