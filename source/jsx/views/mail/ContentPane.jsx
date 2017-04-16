import '../content-pane-fade.less';
import '../mail-preview.less';
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
    componentWillReceiveProps(newProps){
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
        if(!this.props.params.mailid){
            return <div className='contentpane-container'></div>;
        }else{
            return (
                <div className='contentpane-container'>
                    <MailHeader 
                    author={this.state.mail.author} 
                    recipients={this.state.mail.recipients}
                    title={this.state.mail.title}/>
                    <div className='mail-content'>{this.state.mail.content}</div>
                    <HistoryPane history={this.state.mail.history} />
                </div>
            );
        }
    }
});
export default ContentPane;