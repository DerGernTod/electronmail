import React from 'react';
import Constants from '../../Constants.jsx';
const MailHeader = React.createClass({
    componentWillReceiveProps(nextProps) {
        this.setState({
            author: nextProps.author || Constants.EMPTY_AUTHOR,
            recipients: nextProps.recipients || Constants.EMPTY_RECIPIENTS,
            title: nextProps.title || Constants.EMPTY_TITLE
        });
    },
    getInitialState() {
        return {
            author: Constants.EMPTY_AUTHOR,
            recipients: Constants.EMPTY_RECIPIENTS,
            title: Constants.EMPTY_TITLE
        }
    },
    render() {
        var counter = 0;
        //TODO: only show 1 recipient and show "and # others" with an expandable(?) or title
        var recipients = this.state.recipients.map(function(val){
            var prepend = '';
            if(counter != 0){
                prepend = ', ';
            }
            counter++;
            var mailtoLink = 'mailto:' + val;
            return <a key={val} href={mailtoLink} className='recipient'>{prepend}{val}</a>;
        });
        var mailLink = `mailto:${this.state.author.email}`;
        var title = '';
        if(this.state.title != Constants.EMPTY_TITLE){
            title = (<h1>{this.state.title}</h1>);
        }
        return (
            <div className='mail-header'>
                {title}
                <div>
                    <a href={mailLink} title={mailLink}>{this.state.author.name}</a> to {recipients}
                </div>
            </div>
        );
    }
});
export default MailHeader;