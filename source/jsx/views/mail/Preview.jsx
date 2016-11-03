import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
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
        var content = mail.content;
        content = content.length > 80 ? `${content.substr(0, 77)}...` : content;
        return (
            <li key={mail.id} className={mail.unread ? 'unread' : ''}>
                <Link to={linkTarget} activeClassName="active">
                    <div className='author'>{mail.author}</div>
                    <div className='date'>{moment(mail.date).fromNow()}</div>  
                    <div className='title'>{mail.title}</div>
                    <div className='excerpt'>{content}</div> 
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