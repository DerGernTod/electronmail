import React from 'react';
const MailHeader = React.createClass({
    componentWillReceiveProps() {
        this.setState({
            author: this.props.author || 'noone',
            recipients: this.props.recipients || ['nobody@recipient.com'],
            title: this.props.title || 'nothing'
        });
    },
    getInitialState() {
        return {
            author: 'someone',
            recipients: ['somebody@recipient.com'],
            title: 'something'
        }
    },
    render() {
        var counter = 0;
        var recipients = this.state.recipients.map(function(val){
            var prepend = '';
            if(counter != 0){
                prepend = ', ';
            }
            counter++;
            var mailtoLink = 'mailto:' + val;
            return <a key={val} href={mailtoLink}>{prepend}{val}</a>;
        });
        var mailLink = `mailto:${this.state.author.email}`;
        return (
            <div className='mail-header'>
                <h1>{this.state.title}</h1>
                <div>
                    <a href={mailLink} title={mailLink}>{this.state.author.name}</a> to {recipients} 
                </div>
            </div>
        );
    }
});
export default MailHeader;