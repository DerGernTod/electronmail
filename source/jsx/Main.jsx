import './main.less';
import './content-fade.less';
import React from 'react';
import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Mail from './views/mail/Mail.jsx';
import Test from './Test.jsx';
import Settings from './views/settings/Settings.jsx';
//import {get} from './service/nedb';

const Main = React.createClass({
  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]).isRequired,
    location: React.PropTypes.object
  },
  getDefaultProps() {
    return {
      children: []
    };
  },
  getInitialState() {
    return {
      lastMailPoll: 0
    };
  },
  render() {
    var locations = location.hash.split('/');
    var mainKey = locations[0] + locations[1]; //0 is always '#'
    switch (mainKey) {
    case '#mail':
      mainKey += '/' + (locations[2] || '') + '/' + (locations[3] || '');
      break;
    case '#attachments':
      mainKey += '/' + (locations[2] || '') + '/' + (locations[3] || '');
      break;
    case '#settings':
        //don't switch if settings directory changes
      break;
    default:
      break;
    }
    console.log('mainkey', mainKey);
    console.log('key: ' + location.hash);
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
          className="contentcontainer"
          transitionName="content-fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppear={true}
          transitionAppearTimeout={500}>
            <Switch key={mainKey} location={this.props.location}>
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
  }
});
export default Main;
