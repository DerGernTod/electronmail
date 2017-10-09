import './styles/main.less';
import './styles/content-fade.less';
import React from 'react';
import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Mail from 'components/views/mail/Mail.jsx';
import Test from 'components/Test.jsx';
import Settings from './views/settings/Settings.jsx';
//import {get} from './service/nedb';

const Main = ({location}) => {
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
      <ReactCSSTransitionGroup
        component="div"
        className="main-container"
        transitionName="content-fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppear={true}
        transitionAppearTimeout={500}>
          <Switch key={mainKey} location={location}>
            <Route path="/mail/:accounts/:folder/" component={Mail} />

            <Route path="/attachments" component={Test}>
              {/*<IndexRoute component={Attachments} /> */}
              {/*<Route path="/attachments/collection" component={Attachments} />*/}
            </Route>
            <Route path="/settings/:page/" component={Settings} />
          </Switch>
      </ReactCSSTransitionGroup>
    </div>
  );
};
Main.propTypes = {
  location: React.PropTypes.object
};
export default Main;
