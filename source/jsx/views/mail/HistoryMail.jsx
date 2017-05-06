import React from 'react';
import Constants from '../../constants';
import MailHeader from './MailHeader.jsx';
const HistoryMail = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
    author: React.PropTypes.object,
    recipients: React.PropTypes.array
  },
  getDefaultProps: function() {
    return {
      children: [],
      author: {},
      recipients: []
    };
  },
  getInitialState(){
    return {
      author: Constants.EMPTY_AUTHOR,
      recipients: Constants.EMPTY_RECIPIENTS
    };
  },
  componentWillReceiveProps(nextProps){
    this.setState({
      author : nextProps.author || Constants.EMPTY_AUTHOR,
      recipients : nextProps.recipients || Constants.EMPTY_RECIPIENTS
    });
  },
  render(){
    return (
            <div className='history-mail-single'>
                <MailHeader author={this.state.author} recipients={this.state.recipients} />
                <div className='history-mail-content'>
                    {this.props.children}
                </div>
            </div>
    );
  }
});
export default HistoryMail;