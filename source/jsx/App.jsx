import ReactDOM from 'react-dom';
import React from 'react';
import { Route, Router } from 'react-router';
import createHashHistory from 'history/createHashHistory';
import Main from './Main.jsx';
import Test from './Test.jsx';
import Settings from './views/settings/Settings.jsx';
import Calendar from './views/settings/Calendar.jsx';
import Profile from './views/settings/Profile.jsx';
import Synchronization from './views/settings/Synchronization.jsx';
import Mail from './views/mail/Mail.jsx';
import ContentPane from './views/mail/ContentPane.jsx';
import Attachments from './views/attachments/Attachments.jsx';
import AccountTabList from './views/settings/account-components/AccountTabList.jsx';
import AccountTab from './views/settings/account-components/AccountTab.jsx';
const history = createHashHistory();
var routes = (
  <Router history={history}>
    <Route path="/" component={Main}>

    </Route>
  </Router>
);
ReactDOM.render(routes,
    document.getElementById('content')
);
