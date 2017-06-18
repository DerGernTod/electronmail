import '../../content-pane-fade.less';
import './accounts.less';
import React from 'react';
import {Link} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {findAllAccounts} from '../../../service/accounts';
import Constants from '../../../constants';
import AccountTab from './AccountTab.jsx';
const AccountTabList = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
    params: React.PropTypes.object
  },
  getDefaultProps() {
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
    let linkTarget = `${Constants.ROUTES.accounts}/${account.id}`;

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
    let accountsList = [];
    accountsList.push(this.buildAccountPreview({id: -1, name: 'Create account'}));
    this.state.accounts.forEach(mail => accountsList.push(this.buildAccountPreview(mail)));
    let mainKey = this.props.params.account;
    let elem;
    if (!this.props.children) {
      elem = <div />;
    } else {
      elem = <ReactCSSTransitionGroup
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
        </ReactCSSTransitionGroup>;
    }
    return (
      <div className='accounts'>
        <div className='account-tab-list float-left'>
          <ol>
            {accountsList}
          </ol>
        </div>
        {elem}
      </div>
    );
  }
});

export default AccountTabList;
