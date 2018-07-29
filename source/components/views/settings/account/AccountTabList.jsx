import '../../styles/content-pane-fade.less';
import './styles/accounts.less';
import React from 'react';
import {Route, Switch} from 'react-router';
import {NavLink} from 'react-router-dom';
import { ReactCSSTransitionGroup } from 'react-transition-group';
import Constants from '../../../../constants';
import AccountTab from './AccountTab.tsx';
const AccountTabList = React.createClass({
  propTypes: {
    location: React.PropTypes.object,
    match: React.PropTypes.shape({
      params: React.PropTypes.shape({
        account: React.PropTypes.string
      })
    }),
    loadAccounts: React.PropTypes.func,
    loading: React.PropTypes.bool,
    accounts: React.PropTypes.arrayOf(React.PropTypes.object)
  },
  componentWillMount(){
    this.updateAccountList();
  },
  buildAccountPreview(account){
    let linkTarget = `${Constants.ROUTES.accounts}/${account.id}`;

    return (
      <li key={account.id} id={`accounts-list-id-${account.id}`}>
        <NavLink to={linkTarget} activeClassName="active" isActive={() => account.id == this.props.match.params.account || (account.id == '-1' && typeof this.props.match.params.account == 'undefined')} >
          <div className='author'>{account.name}</div>
          {account.address ? (<div className='title'>{account.address}</div>) : null}
        </NavLink>
      </li>
    );
  },
  updateAccountList(scrollToId) {
    this.props.loadAccounts(scrollToId);
  },
  render(){
    let accountsList = [];
    accountsList.push(this.buildAccountPreview({id: -1, name: 'Create account'}));
    const { accounts = [], loading, match, location } = this.props;
    accounts.forEach(account => accountsList.push(this.buildAccountPreview(account)));
    if (!accountsList.length) {
      accountsList.push(<li>Loading accounts...</li>);
    }
    let mainKey = match.params.account;
    return (
      <div className='accounts'>
        <div className='account-tab-list'>
          <ol>
            {accountsList}
          </ol>
        </div>
        <ReactCSSTransitionGroup
        component="div"
        className="contentpane"
        transitionName="content-pane-fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppear={true}
        transitionAppearTimeout={500}>
        <Switch key={mainKey} location={location}>
          <Route path="/settings/accounts/:account?" component={props =>
            <AccountTab {...props} onAccountCreated={id => this.updateAccountList(id)} onAccountModified={id => this.updateAccountList(id)} />
          } />
        </Switch>

        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

export default AccountTabList;
