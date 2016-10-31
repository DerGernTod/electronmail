import ReactDOM from 'react-dom';
import React from 'react';
import {Route, IndexRoute, Link, hashHistory, Router} from 'react-router';
import Main from './Main.jsx';
import Test from './Test.jsx';
import Settings from './views/settings/Settings.jsx';
import Accounts from './views/settings/Accounts.jsx';
import Calendar from './views/settings/Calendar.jsx';
import Profile from './views/settings/Profile.jsx';
import Synchronization from './views/settings/Synchronization.jsx';
import Mail from './views/mail/Mail.jsx';
import ContentPane from './views/mail/ContentPane.jsx';
var routes = (
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={Test}/>
            <Route path="/mail/:accounts/:folder" component={Mail}>
                <IndexRoute component={ContentPane}/>
                <Route path="/mail/:accounts/:folder/:mailid" component={ContentPane} />
            </Route>
            <Route path="/settings" component={Settings}>
                <Route path="/settings/accounts" component={Accounts}/>
                <Route path="/settings/calendar" component={Calendar}/>
                <Route path="/settings/profile" component={Profile}/>
                <Route path="/settings/synchronization" component={Synchronization}/>
            </Route>
        </Route>
        {/*<Route path="/admin" component={AdminContainer} onEnter={requireAuth}>
            <Route path="/admin/tags" component={AdminTagsPage}>
                <IndexRoute component={AdminTagsLatestPage} />
                <Route path="/admin/tags/latest" component={AdminTagsLatestPage}/>
                <Route path="/admin/tags/search/:keyword" component={AdminTagsSearchPage}/>
            </Route>
            <Route path="/admin/*" component={NotFoundPage}/>
        </Route>*/
        }
    </Router>
);
ReactDOM.render(routes,
    document.getElementById('content')
);