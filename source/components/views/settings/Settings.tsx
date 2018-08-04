//import './settings-accounts.less';
import './styles/settings.less';
import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Switch, Route, RouteComponentProps, withRouter } from 'react-router';
import AccountTabListContainer from '@/containers/views/settings/account/AccountTabListContainer';
import Calendar from './Calendar';
import Profile from './Profile';
import Synchronization from './Synchronization';

interface SettingsRouterParams {
  page: string;
}

const Settings = ({ location, match }: RouteComponentProps<SettingsRouterParams>) => {
  return (
    <div className='flex flex-column full-height'>
      <h1>Settings</h1>
      <TransitionGroup className='contentcontainer settings no-offset'>
        <CSSTransition
          classNames="content-fade"
          appear={true}
          timeout={500}
          key={match.params.page}>
          <Switch key={match.params.page} location={location}>
            <Route path="/settings/accounts/:account?" component={AccountTabListContainer} />
            <Route path="/settings/calendar" component={Calendar} />
            <Route path="/settings/profile" component={Profile} />
            <Route path="/settings/synchronization" component={Synchronization} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};
export default withRouter(Settings);
