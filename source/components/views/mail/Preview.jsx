import React from 'react';
import {NavLink} from 'react-router-dom';
import moment from 'moment';
const Preview = React.createClass({
  propTypes: {
    accounts: React.PropTypes.string,
    folder: React.PropTypes.string,
    mails: React.PropTypes.arrayOf(React.PropTypes.object),
    match: React.PropTypes.shape({
      params: React.PropTypes.shape({
        folder: React.PropTypes.string,
        accounts: React.PropTypes.string
      })
    })
  },
  getInitialState(){
    return { mails : []};
  },
  componentDidMount(){
    this.setState({
      mails : this.props.mails
    });
  },
  buildMailPreview(mail){
    const { accounts, folder } = this.props.match.params;
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
  render(){
    var mailList = this.state.mails.map(mail => this.buildMailPreview(mail));
    return (
      <div className='float-left mail-preview'>
        <ol>
          {mailList}
        </ol>
      </div>
    );
  }
});
export default Preview;
