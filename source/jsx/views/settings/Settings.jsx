//import './settings-accounts.less';
import './settings.less';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { hashHistory } from 'react-router';
import Constants from '../../constants';
const Settings = React.createClass({
  componentWillReceiveProps(newProps) {
    if (location.href.indexOf(Constants.ROUTES.accounts) > -1 && isNaN(newProps.params.account)) {
      hashHistory.push(Constants.ROUTES.accounts + '/-1');
    }
  },
  render() {
    return (
        <div>
            <h1>Settings</h1>

            <ReactCSSTransitionGroup
                component="div"
                className="contentcontainer no-offset float-left settings"
                transitionName="content-fade"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                transitionAppear={true}
                transitionAppearTimeout={500}>
                {React.cloneElement(this.props.children, {
                  key: location.hash.split('/')[2], //only switch if settings-page changes
                })}
            </ReactCSSTransitionGroup>
        </div>
    );
  }
});
export default Settings;
