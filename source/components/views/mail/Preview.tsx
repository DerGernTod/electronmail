import * as React from 'react';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import * as moment from 'moment';
import { Mail } from '@/typings';

export interface PreviewProps extends RouteComponentProps<AccountPropsRouterParams & FolderPropsRouterParams> {
  mails: Mail[];
  requestMails: () => void;
}

class Preview extends React.Component<PreviewProps> {
  private refreshTimeout: number;
  componentWillMount() {
    this.props.requestMails();
    this.refreshTimeout = this.triggerMailRefresh();
  }

  triggerMailRefresh() {
    return window.setTimeout(() => {
      this.props.requestMails();
      this.refreshTimeout = this.triggerMailRefresh();
    }, 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.refreshTimeout);
  }

  render() {
    const {accounts, folder} = this.props.match.params;

    let mailList = this.props.mails.map(mail => this.buildMailPreview(mail, accounts, folder));
    let element = <div className='flex-center align-center'>No items yet</div>;
    if (mailList.length) {
      element = (
      <ol>
        {mailList}
      </ol>
    );
    }
    return (
    <div className='float-left mail-preview'>
      {element}
    </div>
    );
  }

  buildMailPreview(mail: Mail, accounts: string, folder: string) {
    const target = '/mail/' + accounts + '/' + folder + '/' + String(mail.id);
    let content = mail.content;
    content = content.length > 80 ? `${content.substr(0, 77)}...` : content;
    return (
      <li key={mail.id} className={mail.unread ? 'unread' : ''}>
        <NavLink to={target} activeClassName='active' >
          <div className='author'>{mail.author.name}</div>
          <div className='date'>{moment(mail.date).fromNow()}</div>
          <div className='title'>{mail.title}</div>
          <div className='excerpt'>{content}</div>
        </NavLink>
      </li>
    );
  }
}

export default withRouter(Preview);
