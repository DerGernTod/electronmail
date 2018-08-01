import * as React from 'react';
import MailHeader from './MailHeader';
import { Author } from '@/typings';

interface HistoryMailProps {
  children: JSX.Element | string;
  author: Author;
  recipients: string[];
}

const HistoryMail = ({children, author, recipients}: HistoryMailProps): JSX.Element => {
  return (
    <div className='history-mail-single'>
      <MailHeader author={author} recipients={recipients} />
      <div className='history-mail-content'>
          {children}
      </div>
    </div>
  );
};
export default HistoryMail;
