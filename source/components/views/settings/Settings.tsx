//import './settings-accounts.less';
import './styles/settings.less';
import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Switch, Route, RouteComponentProps, withRouter } from 'react-router';
import AccountTabListContainer from '@/containers/views/settings/account/AccountTabListContainer';
import Calendar from './Calendar';
import Profile from './Profile';
import Synchronization from './Synchronization';

interface SettingsRouterParams {
  page: string;
}

const Settings = ({location, match}: RouteComponentProps<SettingsRouterParams>) => {
  return (
    <div className='flex flex-column full-height'>
      <h1>Settings</h1>

      <CSSTransition
        component="div"
        classNames="contentcontainer settings no-offset"
        transitionName="content-fade"
        appear={true}
        timeout={{
          enter: 500,
          exit: 500
        }}
        transitionAppear={true}>
          <Switch key={match.params.page} location={location}>
            <Route path="/settings/accounts/:account?" component={AccountTabListContainer} />
            <Route path="/settings/calendar" component={Calendar} />
            <Route path="/settings/profile" component={Profile} />
            <Route path="/settings/synchronization" component={Synchronization} />
          </Switch>
      </CSSTransition>
    </div>
  );
};
export default withRouter(Settings);
