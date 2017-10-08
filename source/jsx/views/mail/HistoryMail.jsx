import React from 'react';
import Constants from '../../constants';
import MailHeader from './MailHeader.jsx';
const HistoryMail = ({children, author, recipients}) => {
  return (
    <div className='history-mail-single'>
      <MailHeader author={author} recipients={recipients} />
      <div className='history-mail-content'>
          {children}
      </div>
    </div>
  );
};
HistoryMail.propTypes = {
  children: React.PropTypes.any.isRequired,
  author: React.PropTypes.object.isRequired,
  recipients: React.PropTypes.array.isRequired
};
export default HistoryMail;
