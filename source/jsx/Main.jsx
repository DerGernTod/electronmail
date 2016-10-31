import React from 'react';
import {Link} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
const Main = React.createClass({
    render : function(){
        var locations = location.hash.split("/");
        var mainKey = locations[0] + "/" + locations[1] + "/" + (locations[2] || "") + "/" + (locations[3] || "");
        console.log("mainKey: ", mainKey);
        return (
            <div>
                <div className="menucontainer float-left">
                    <nav>
                        <div><span className="fa fa-inbox"> </span>Mail</div>
                        <Link to="/mail/accounts/inbox" activeClassName="active">Inbox</Link>
                        <Link to="/mail/accounts/nextsteps" activeClassName="active">Next Steps</Link>
                        <Link to="/mail/accounts/favourites" activeClassName="active">Favourites</Link>
                        <Link to="/mail/accounts/sent" activeClassName="active">Sent</Link>
                        <Link to="/mail/accounts/drafts" activeClassName="active">Drafts</Link>
                        <Link to="/mail/accounts/thrash" activeClassName="active">Thrash</Link>
                    </nav>
                    <nav>
                        <div><span className="fa fa-cogs"> </span>Configuration</div>
                        <Link to="/settings/accounts" activeClassName="active">Accounts</Link>
                        <Link to="/settings/calendar" activeClassName="active">Calendar</Link>
                        <Link to="/settings/profile" activeClassName="active">Profile</Link>
                        <Link to="/settings/synchronization" activeClassName="active">Synchronization</Link>
                    </nav>
                </div>    
                <ReactCSSTransitionGroup 
                    component="div"
                    className="contentcontainer float-left"
                    transitionName="content-fade"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    transitionAppear={true}
                    transitionAppearTimeout={500}>
                    {React.cloneElement(this.props.children, {
                        key: mainKey
                    })}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
});
export default Main;