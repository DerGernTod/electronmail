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
                author: "some author with a weirdly long name that also doesn't fit into the title view", 
                title: "some title",
                content: "lorem ipsum dolor sit amet. consetetur sadipecing elitr.",
                date: Date.now(),
                id: 0,
                unread: true
            },
            { 
                author: "noderich", 
                title: "some longer title that doesn't fit into the title view",
                content: `At vero eos et accusam et justo duo dolores et ea rebum. 
                Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
                invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam 
                et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem 
                ipsum dolor sit amet.
                `,
                date: Date.now() - 60000,
                id: 1
            },
            { 
                author: "noderino", 
                title: "some title 3",
                content: `Lorem sönderzeichen %ß µ ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
                invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo 
                duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit 
                amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
                invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et 
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor 
                sit amet.`,
                date: Date.now() - 60000*60,
                unread: true,
                id: 2
            }
        ];
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