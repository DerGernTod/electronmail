import React from 'react';
import {Link} from 'react-router';
const Main = React.createClass({
    render : function(){
        return (
            <div>
                <div className="menucontainer float-left">
                    <h1>Menu</h1>
                    <nav>
                        <div><span className="fa fa-cogs"> </span>Configuration</div>
                        <Link to="/settings/accounts" activeClassName="active">Accounts</Link>
                        <Link to="/settings/calendar" activeClassName="active">Calendar</Link>
                        <Link to="/settings/profile" activeClassName="active">Profile</Link>
                        <Link to="/settings/synchronization" activeClassName="active">Synchronization</Link>
                    </nav>
                </div>
                <div className="contentcontainer float-left">

                    {this.props.children}
                </div>
            </div>
        );
    }
});
export default Main;