import React from 'react';
import {Link} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Preview from './Preview.jsx';
import ContentPane from './ContentPane.jsx';
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
        return [
            { 
                author: "node", 
                title: "some title",
                excerpt: "lorem ipsum dolor sit amet. consetetur sadipecing elitr.",
                date: Date.now(),
                id: 0
            },
            { 
                author: "noderich", 
                title: "some title 2",
                excerpt: "lorem ipsum dolor sit amet. consetetur sadipecing elitr.",
                date: Date.now() - 50,
                id: 1
            },
            { 
                author: "noderino", 
                title: "some title 3",
                excerpt: "lorem ipsum dolor sit amet. consetetur sadipecing elitr.",
                date: Date.now() - 100,
                id: 2
            }
        ];
    },
    render : function(){
        var mails = this.getMails();
        return (
            <div>
                <Preview mails={mails} accounts={this.state.accounts.join(";")} folder={this.state.folder} className="float-left mail-preview" />
                {this.props.children}
            </div>
        );
    }
});
export default Mail;