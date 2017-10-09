import React from 'react';
import {NavLink} from 'react-router-dom';
import moment from 'moment';
const Preview = React.createClass({
  componentWillMount() {
    this.props.requestMails();
    this.refreshTimeout = this.triggerMailRefresh();
  },
  triggerMailRefresh() {
    return setTimeout(() => {
      this.props.requestMails();
      this.refreshTimeout = this.triggerMailRefresh();
    }, 5000);
  },
  componentWillUnmount() {
    clearTimeout(this.refreshTimeout);
  },
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
  },
  buildMailPreview(mail, accounts, folder) {
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
  },
  propTypes: {
    match: React.PropTypes.shape({
      params: React.PropTypes.shape({
        accounts: React.PropTypes.string,
        folder: React.PropTypes.string
      })
    }),
    mails: React.PropTypes.arrayOf(React.PropTypes.object),
    requestMails: React.PropTypes.func
  }
});
export default Preview;
