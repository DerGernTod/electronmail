import React from 'react';
import MailHeader from './MailHeader.jsx';
import HistoryPane from './HistoryPane.jsx';
import Constants from '../../Constants.jsx';
const ContentPane = React.createClass({
    componentDidMount(){
        this.setState({
            mail : Constants.MAILS.find(function(entry){
                return entry.id == Number(this.props.params.mailid);
            }.bind(this))
        });
    },
    getInitialState(){
        return {
            mail : {}
        };
    },
    render(){
        var mailId = this.props.params.mailid;
        var content = mailId || -1;
        var header = "Nothing to show";
        if(!mailId){
            content = "select a mail to view!";
        }else{
            header = 
                <MailHeader 
                    author={this.state.mail.author} 
                    recipients={this.state.mail.recipients}
                    title={this.state.mail.title}/>;
            content = this.state.mail.content;
        }
        
        return (
            <div className='contentpane-container'>
                {header}
                <div className='mail-content'>{content}</div>
                <HistoryPane />
            </div>
        );
    }
});
export default ContentPane;