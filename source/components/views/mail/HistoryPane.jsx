import './styles/mail-history.less';
import React from 'react';
import HistoryMail from './HistoryMail.jsx';
const HistoryPane = ({historyData}) => {
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
HistoryPane.propTypes = {
  historyData: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      author: React.PropTypes.object.isRequired,
      recipients: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
      content: React.PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};
export default HistoryPane;
