import React from 'react';
import MailHeader from './MailHeader.jsx';
import HistoryPane from './HistoryPane.jsx';
const ContentPane = React.createClass({
    getInitialState : function(){
        return {
            mail : this.props.mail
        };
    },
    render : function(){
        var mailId = this.props.params.mailid;
        var content = mailId
        if(!mailId){
            content = "select a mail to view!";
        }
        return (
            <div className={this.props.className}>
                <MailHeader />
                <h1>Content pane {content}!</h1>
                <div>some content</div>
                <HistoryPane />

            </div>
        );
    }
});
export default ContentPane;