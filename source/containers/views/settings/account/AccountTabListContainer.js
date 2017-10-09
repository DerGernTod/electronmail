import AccountTabList from 'components/views/settings/account/AccountTabList.jsx';
import {connect} from 'react-redux';
import {loadAccounts} from 'store/actions';
const mapStateToProps = ({accounts}, ownProps) => {
  return {
    accounts: accounts.data,
    loading: accounts.loading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadAccounts: (scrollToId) => dispatch(loadAccounts(scrollToId))
  };
};

// TODO: why does it load accounts into state but doesn't update props?
export default connect(mapStateToProps, mapDispatchToProps)(AccountTabList);
