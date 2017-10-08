import './mail.less';
import React from 'react';
import { Route, Switch } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Preview from './Preview.jsx';
import ContentPane from './ContentPane.jsx';
import Constants from '../../constants.js';
const Mail = ({ match, location }) => {
  const { accounts, folder } = match.params;
  return (
    <div>
      <Preview match={match} mails={Constants.MAILS} accounts={accounts} folder={folder} />
      <ReactCSSTransitionGroup
        component="div"
        className="contentpane float-left"
        transitionName="content-pane-fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppear={true}
        transitionAppearTimeout={500}>
        <Route path={`/mail/${accounts}/${folder}/:mailid?`} key={location.pathname} component={ContentPane} location={location} />
      </ReactCSSTransitionGroup>
    </div>
  );
};
Mail.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element),
  match: React.PropTypes.shape({
    params: React.PropTypes.shape({
      accounts: React.PropTypes.string,
      folder: React.PropTypes.string
    }).isRequired
  }).isRequired,
  location: React.PropTypes.object
};
export default Mail;
