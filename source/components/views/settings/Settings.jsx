//import './settings-accounts.less';
import './styles/settings.less';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Switch, Route } from 'react-router';
import AccountTabListContainer from 'containers/views/settings/account/AccountTabListContainer';
import Calendar from './Calendar.jsx';
import Profile from './Profile.jsx';
import Synchronization from './Synchronization.jsx';
const Settings = ({location, match}) => {
  return (
    <div className='flex flex-column full-height'>
      <h1>Settings</h1>

      <ReactCSSTransitionGroup
        component="div"
        className="contentcontainer settings no-offset"
        transitionName="content-fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppear={true}
        transitionAppearTimeout={500}>
          <Switch key={match.params.page} location={location}>
            <Route path="/settings/accounts/:account?" component={AccountTabListContainer} />
            <Route path="/settings/calendar" component={Calendar} />
            <Route path="/settings/profile" component={Profile} />
            <Route path="/settings/synchronization" component={Synchronization} />
          </Switch>
      </ReactCSSTransitionGroup>
    </div>
  );
};
Settings.propTypes = {
  location: React.PropTypes.object,
  match: React.PropTypes.shape({
    params: React.PropTypes.shape({
      page: React.PropTypes.string
    })
  })
};
export default Settings;
