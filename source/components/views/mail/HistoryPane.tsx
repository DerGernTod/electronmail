import './styles/mail-history.less';
import * as React from 'react';
import HistoryMail from './HistoryMail';
import { Author } from '@/typings';

interface HistoryPaneProps {
  historyData: {
    author: Author;
    recipients: string[];
    content: string | JSX.Element;
  }[]
}

const HistoryPane = ({historyData}: HistoryPaneProps): JSX.Element => {
  var key = 0;
  var historyMails = historyData.map(value => {
    return (
      <HistoryMail
        key={key++}
        author={value.author}
        recipients={value.recipients}>
        {value.content}
      </HistoryMail>);
  });
  return (
    <div>
      {historyMails}
    </div>
  );
};
export default HistoryPane;
