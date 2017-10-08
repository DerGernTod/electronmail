import '../content-pane-fade.less';
import '../mail-preview.less';
import React from 'react';
import MailHeader from './MailHeader.jsx';
import HistoryPane from './HistoryPane.jsx';
import Constants from '../../constants';
const ContentPane = ({match}) => {
  const { mailid } = match.params;
  const mail = Constants.MAILS.find((entry) => {
    return entry.id == Number(mailid);
  });
  if (!mail) {
    return (
      <div className='contentpane-container'>
        <div className='flex-center'>
          <h1>Select a mail to continue</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className='contentpane-container'>
        <MailHeader
          author={mail.author}
          recipients={mail.recipients}
          title={mail.title}/>
        <div className='mail-content'>{mail.content}</div>
        {mail.history ? <HistoryPane historyData={mail.history} /> : null}
      </div>
    );
  }
};
ContentPane.propTypes = {
  match : React.PropTypes.shape({
    params: React.PropTypes.shape({
      mailid: React.PropTypes.string
    })
  })
};
export default ContentPane;
