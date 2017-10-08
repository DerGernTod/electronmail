import React from 'react';
import Constants from '../../constants';
const MailHeader = ({
  author = Constants.EMPTY_AUTHOR,
  recipients = Constants.EMPTY_RECIPIENTS,
  title = Constants.EMPTY_TITLE}) => {

  let counter = 0;
  let titleString = '';
      //TODO: only show 1 recipient and show "and # others" with an expandable(?) or title
  recipients = recipients.map(val => {
    var prepend = '';
    if (counter != 0 && counter != Constants.SHOWN_RECIPIENTS) {
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

  var mailLink = `mailto:${author.email}`;
  if(title != Constants.EMPTY_TITLE){
    titleString = (<h1>{title}</h1>);
  }
  return (
    <div className='mail-header'>
        {titleString}
        <div>
            <a href={mailLink} title={mailLink}>{author.name}</a> to {fullRecipients}
            {displayRecipients}
        </div>
    </div>
  );
};
MailHeader.propTypes = {
  author: React.PropTypes.object,
  recipients: React.PropTypes.array,
  title: React.PropTypes.string
};
export default MailHeader;
