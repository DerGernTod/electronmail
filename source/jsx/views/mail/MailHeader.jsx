import React from 'react';
import Constants from '../../constants';
const MailHeader = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
    author: React.PropTypes.object,
    recipients: React.PropTypes.array,
    title: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      children: [],
      author: {
        account : -1
      }
    };
  },
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
    };
  },
  render() {
    var counter = 0;
    var titleString = '';
        //TODO: only show 1 recipient and show "and # others" with an expandable(?) or title
        
        
    var recipients = this.state.recipients.map(function(val){
      var prepend = '';
      if(counter != 0 && counter != Constants.SHOWN_RECIPIENTS){
        prepend = ', ';
      }
      counter++;
      var mailtoLink = 'mailto:' + val;
      return <a key={val} href={mailtoLink} className='recipient'>{prepend}{val}</a>;
    });

    var fullRecipients = recipients.slice(0, Math.min(Constants.SHOWN_RECIPIENTS, recipients.length));
    var hiddenRecipients = recipients.length > Constants.SHOWN_RECIPIENTS 
            ? recipients.slice(Constants.SHOWN_RECIPIENTS) 
            : [];
    var displayRecipients = [];
    if(hiddenRecipients.length){
      displayRecipients = 
            <span className='others'> <span>and {hiddenRecipients.length} others</span>
                <div className='hiddenRecipients'>{hiddenRecipients}</div>
            </span>;
    }

    var mailLink = `mailto:${this.state.author.email}`;
    var title = '';
    if(this.state.title != Constants.EMPTY_TITLE){
      title = (<h1>{this.state.title}</h1>);
    }
    return (
            <div className='mail-header'>
                {title}
                <div>
                    <a href={mailLink} title={mailLink}>{this.state.author.name}</a> to {fullRecipients}
                    {displayRecipients}
                </div>
            </div>
    );
  }
});
export default MailHeader;