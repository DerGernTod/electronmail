import { connect } from 'react-redux';
import { loadMails } from 'store/actions';
import Preview from 'components/views/mail/Preview.jsx';
const mapDispatchToProps = (dispatch, { match }) => {
  const {accounts, folder} = match.params;
  return {
    requestMails: () => dispatch(loadMails(accounts, folder))
  };
};
const mapStateToProps = (state, { match }) => {
  let {accounts, folder} = match.params;
  accounts = accounts.split(',');
  let mails = state.mails && state.mails.filter(mail => accounts.includes(mail.account) && mail.folder == folder);
  return {
    mails
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Preview);
