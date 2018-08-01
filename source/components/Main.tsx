import './styles/main.less';
import './styles/content-fade.less';
import * as React from 'react';
import { Route, Switch, RouteComponentProps, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import MailComponent from './views/mail/MailComponent';
import Test from './Test';
import Settings from './views/settings/Settings';
//import {get} from './service/nedb';

const Main = ({location}: RouteComponentProps<null>) => {
  var locations = location.pathname.split('/');
  var mainKey = locations[1]; //0 is always an empty string
  switch (mainKey) {
  case 'mail':
    mainKey += '/' + (locations[2] || '') + '/' + (locations[3] || '');
    break;
  case 'attachments':
    mainKey += '/' + (locations[2] || '') + '/' + (locations[3] || '');
    break;
  case 'settings':
      //don't switch if settings directory changes, settings page switches internally
    break;
  default:
    break;
  }
  console.log('mainkey', mainKey);
  console.log('pathname ' + location.pathname);
  return (
    <div className="flex">
      <div className="menucontainer">
        <nav>
          <div><span className="fa fa-inbox"> </span>Mail</div>
          <NavLink to="/mail/accounts/inbox" activeClassName="active">Inbox</NavLink>
          <NavLink to="/mail/accounts/nextsteps" activeClassName="active">Next Steps</NavLink>
          <NavLink to="/mail/accounts/favourites" activeClassName="active">Favourites</NavLink>
          <NavLink to="/mail/accounts/sent" activeClassName="active">Sent</NavLink>
          <NavLink to="/mail/accounts/drafts" activeClassName="active">Drafts</NavLink>
          <NavLink to="/mail/accounts/thrash" activeClassName="active">Thrash</NavLink>
        </nav>
        <nav>
          <div><span className="fa fa-download"> </span>Attachments</div>
          <NavLink to="/attachments/collection" activeClassName="active">Collection</NavLink>
          <NavLink to="/attachments/collection2" activeClassName="active">Add Folder</NavLink>
        </nav>
        <nav>
          <div><span className="fa fa-cogs"> </span>Configuration</div>
          <NavLink to="/settings/accounts" activeClassName="active">Accounts</NavLink>
          <NavLink to="/settings/calendar" activeClassName="active">Calendar</NavLink>
          <NavLink to="/settings/profile" activeClassName="active">Profile</NavLink>
          <NavLink to="/settings/synchronization" activeClassName="active">Synchronization</NavLink>
        </nav>
      </div>
      <CSSTransition
        component="div"
        classNames="main-container"
        transitionName="content-fade"
        timeout={{
          enter: 500,
          exit: 500
        }}
        appear={true}
        transitionAppearTimeout={500}>
          <Switch key={mainKey} location={location}>
            <Route path="/mail/:accounts/:folder/" component={MailComponent} />

            <Route path="/attachments" component={Test}>
              {/*<IndexRoute component={Attachments} /> */}
              {/*<Route path="/attachments/collection" component={Attachments} />*/}
            </Route>
            <Route path="/settings/:page/" component={Settings} />
          </Switch>
      </CSSTransition>
    </div>
  );
};
export default withRouter(Main);
