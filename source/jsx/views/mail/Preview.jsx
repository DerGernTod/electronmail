import React from 'react';
import {Link} from 'react-router';
const Preview = React.createClass({
    getInitialState : function(){
        return { mails : []}
    },
    componentDidMount : function(){
        this.setState({
            mails : this.props.mails
        });
    },
    buildMailPreview : function(mail){
        var linkTarget = "mail/" + this.props.accounts + "/" + this.props.folder + "/" + mail.id
        return (
            <li key={mail.id}>
                <Link to={linkTarget} activeClassName="active">
                    <div>{mail.author}</div>
                    <div>{mail.title}</div>
                    <div>{mail.excerpt}</div>
                    <div>{mail.date}</div>   
                </Link>
            </li>
        );
    },
    render : function(){
        var mailList = [];
        this.state.mails.forEach(function(mail){
            mailList.push(this.buildMailPreview(mail));
        }.bind(this));
        return (
            <div className={this.props.className}>
                <ol>
                    {mailList}
                </ol>
            </div>
        )
    }
});
export default Preview;