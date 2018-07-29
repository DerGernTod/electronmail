import '../../styles/content-pane-fade.less';
import './styles/accounts.less';
import * as React from 'react';
import {Route, Switch, RouteComponentProps, withRouter} from 'react-router';
import {NavLink} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Constants from '../../../../constants';
import AccountTab, { AccountTabProps } from './AccountTab';

interface Account {
  id: number;
  name: string;
  address?: string;
}

interface AccountTabListRouterParams {
  account: string;
}

interface AccountTabListProps extends RouteComponentProps<AccountTabListRouterParams> {
  loading: boolean;
  accounts: Account[];
  loadAccounts: (id: number) => void;
}

class AccountTabList extends React.Component<AccountTabListProps> {

  componentWillMount(){
    this.updateAccountList(-1);
  }

  buildAccountPreview(account: Account){
    let linkTarget = `${Constants.ROUTES.accounts}/${account.id}`;

    return (
      <li key={account.id} id={`accounts-list-id-${account.id}`}>
        <NavLink to={linkTarget} activeClassName="active" isActive={() => account.id === Number(this.props.match.params.account) || (account.id === -1 && typeof this.props.match.params.account == 'undefined')} >
          <div className='author'>{account.name}</div>
          {account.address ? (<div className='title'>{account.address}</div>) : null}
        </NavLink>
      </li>
    );
  }

  updateAccountList(scrollToId?: number) {
    this.props.loadAccounts(scrollToId === void 0 ? -1 : scrollToId);
  }

  render(){
    let accountsList: JSX.Element[] = [];
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
        <CSSTransition
        component="div"
        classNames="contentpane"
        transitionName="content-pane-fade"
        timeout={{
          enter: 500,
          exit: 500
        }}
        appear={true}>
        <Switch key={mainKey} location={location}>
          <Route path="/settings/accounts/:account?" component={(props: AccountTabProps) =>
            <AccountTab {...props} onAccountCreated={id => this.updateAccountList(id)} onAccountModified={id => this.updateAccountList(id)} />
          } />
        </Switch>

        </CSSTransition>
      </div>
    );
  }
}

export default withRouter(AccountTabList);
