import './mail.less';
import React from 'react';
import {Link} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Preview from './Preview.jsx';
import ContentPane from './ContentPane.jsx';
import Constants from '../../Constants.jsx';
const Mail = React.createClass({
    getInitialState : function(){
        return {
            accounts : [],
            folder : ""
        }
    },
    componentDidMount : function(){
        this.setState({
            accounts: this.props.params.accounts.split(";"),
            folder : this.props.params.folder
        });
    },
    getMails : function(){
        //TODO: look in db here
        return Constants.MAILS;
    },
    render : function(){
        var mails = this.getMails();
        return (
            <div>
                <Preview mails={mails} accounts={this.state.accounts.join(";")} folder={this.state.folder} className="float-left mail-preview" />
                
                <ReactCSSTransitionGroup 
                    component="div"
                    className="contentpane float-left"
                    transitionName="content-pane-fade"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    transitionAppear={true}
                    transitionAppearTimeout={500}>
                    {React.cloneElement(this.props.children, {
                        key: location.hash
                    })}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
});
export default Mail;