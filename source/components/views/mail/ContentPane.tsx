import '../styles/content-pane-fade.less';
import '../styles/mail-preview.less';
import * as React from 'react';
import MailHeader from './MailHeader';
import HistoryPane from './HistoryPane';
import { withRouter, RouteComponentProps } from 'react-router';
import Constants from '../../../constants';

interface ContentPaneRouterParams {
  mailid: string;
}

const ContentPane = ({match}: RouteComponentProps<ContentPaneRouterParams>) => {
  const { mailid } = match.params;
  const mail = Constants.MAILS.find((entry) => {
    return entry.id == Number(mailid);
  });
  if (!mail) {
    return (
      <div className='contentpane-container flex-center align-center'>
        <h1>Select a mail to continue</h1>
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

export default withRouter(ContentPane);
