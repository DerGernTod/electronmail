import AccountTabList from '@/components/views/settings/account/AccountTabList.tsx';
import { connect } from 'react-redux';
import { loadAccounts, AsyncDispatch } from '@/store/actions';
import { State } from '@/store/state';


// TODO: why does it load accounts into state but doesn't update props?
export default connect(
  ({ accounts }: State) => {
    return {
      accounts: accounts.data,
      loading: accounts.loading
    };
  }, (dispatch: AsyncDispatch) => {
    return {
      loadAccounts: (scrollToId: number) => dispatch(loadAccounts(scrollToId))
    };
  })(AccountTabList);
