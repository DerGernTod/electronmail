import '../../styles/content-pane-fade.less';
import './styles/accounts.less';
import React from 'react';
import {Route, Switch} from 'react-router';
import {NavLink} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {findAllAccounts} from '../../../../service/accounts';
import Constants from '../../../../constants';
import AccountTab from './AccountTab.jsx';
const AccountTabList = React.createClass({
  propTypes: {
    location: React.PropTypes.object,
    match: React.PropTypes.shape({
      params: React.PropTypes.shape({
        account: React.PropTypes.string
      })
    })
  },
  componentWillMount(){
    this.setState({
      accounts: []
    });
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
    findAllAccounts()
    .then(accounts => this.setState({ accounts: accounts.sort((a, b) => {
      return a.name.localeCompare(b.name);
    })}))
    .then(() => {
      let element = document.getElementById(`accounts-list-id-${scrollToId}`);
      element && element.scrollIntoViewIfNeeded();
    });
  },
  render(){
    let accountsList = [];
    accountsList.push(this.buildAccountPreview({id: -1, name: 'Create account'}));
    this.state.accounts.forEach(mail => accountsList.push(this.buildAccountPreview(mail)));
    if (!accountsList.length) {
      accountsList.push(<li>Loading accounts...</li>);
    }
    let mainKey = this.props.match.params.account;
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
        <Switch key={mainKey} location={this.props.location}>
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
