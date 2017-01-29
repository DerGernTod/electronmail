import React from 'react';
import Constants from '../../../Constants.jsx';
import {Link} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const AccountTabList = React.createClass({
    
    getInitialState(){
        return { accounts : Constants.ACCOUNTS };
    },
    componentDidMount(){
        this.setState({
            accounts : Constants.ACCOUNTS
        });
    },
    buildAccountPreview(account){
        var linkTarget = "settings/accounts/" + account.id;
        
        return (
            <li key={account.id}>
                <Link to={linkTarget} activeClassName="active">
                    <div className='author'>{account.name}</div>
                    <div className='title'>{account.address}</div>
                </Link>
            </li>
        );
    },
    render(){
        var accountsList = [];
        accountsList.push(this.buildAccountPreview({id: -1, name: 'New Account', address: 'new@accou.nt'}))
        this.state.accounts.forEach(function(mail){
            accountsList.push(this.buildAccountPreview(mail));
        }.bind(this));
        var mainKey = this.props.params.account || -1;
        return (
            <div className={this.props.className}>
                <ol>
                    {accountsList}
                </ol>
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

export default AccountTabList;