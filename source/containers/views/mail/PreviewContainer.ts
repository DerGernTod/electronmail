import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { loadMails } from '@/store/actions';
import { State } from '@/store/state';
import Preview from '@/components/views/mail/Preview';

export default withRouter(connect(
  (state: State, { match }: RouteComponentProps<AccountPropsRouterParams & FolderPropsRouterParams>) => {
    let { accounts, folder } = match.params;
    let accountsArray = accounts.split(',');
    let mails = state.mails && state.mails.mails.filter(mail => accounts.includes(mail.account) && mail.folder == folder);
    return {
      mails
    };
  },
  (dispatch, { match }) => {
    const { accounts, folder } = match.params;
    return {
      requestMails: () => dispatch(loadMails(/*accounts, folder*/))
    };
  })(Preview));
