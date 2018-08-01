import * as React from 'react';
import Constants from '../../../constants';
import { Author } from '@/typings';

interface MailHeaderProps {
  author: Author;
  recipients: string[];
  title?: string;
}
const MailHeader = ({
  author = Constants.EMPTY_AUTHOR,
  recipients = Constants.EMPTY_RECIPIENTS,
  title = Constants.EMPTY_TITLE}: MailHeaderProps) => {

  let counter = 0;
  let titleString: JSX.Element | undefined;
      //TODO: only show 1 recipient and show "and # others" with an expandable(?) or title
  const mappedRecipients = recipients.map(val => {
    var prepend = '';
    if (counter != 0 && counter != Constants.SHOWN_RECIPIENTS) {
      prepend = ', ';
    }
    counter++;
    var mailtoLink = 'mailto:' + val;
    return <a key={val} href={mailtoLink} className='recipient'>{prepend}{val}</a>;
  });

  var fullRecipients = mappedRecipients.slice(0, Math.min(Constants.SHOWN_RECIPIENTS, mappedRecipients.length));
  var hiddenRecipients = mappedRecipients.length > Constants.SHOWN_RECIPIENTS
              ? mappedRecipients.slice(Constants.SHOWN_RECIPIENTS)
              : [];
  var displayRecipients: JSX.Element | undefined;
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

export default MailHeader;
