import React from 'react';
import { changePassword } from '../../../service/crypto';
import { findMails } from '../../../service/nedb';
const AccountTab = React.createClass({
  getInitialState() {
    return { connected: false, value: '' };
  },
  componentDidMount() {
    findMails({})
    .then(result => 
      this.setState({
        connected : true,
        data : result
      })
    ).catch(err => 
      this.setState({
        connected : true,
        data : err
      })
    );
  },
  handleChange(evt) {
    this.setState({
      value : evt.target.value
    });
  },
  handleSubmit(evt) {
    evt.preventDefault();
    let before = performance.now();
    changePassword(this.state.value)
    .then(() => 
      this.setState({
        ...this.state,
        changeDuration : performance.now() - before
      })
    )
    .catch(err => 
      this.setState({
        ...this.state,
        changeDuration : 'error: ' + err
      })
    );
  },
  render() {
    var accountId = this.props.params && this.props.params.account || -1;
    var data = this.state.data || 'no data yet';
    return (
      <div className='contentpane-container'>
          This is an account tab for {accountId}
          <div>Connected: {JSON.stringify(this.state.connected)}</div>    
          <div>Data: {JSON.stringify(data)}</div>
          <form onSubmit={this.handleSubmit}>
            <input type='text' value={this.state.value} onChange={this.handleChange} />
            <input type='submit' value='Change db pass' />
          </form>
          {this.state.changeDuration && `Changing db password took ${this.state.changeDuration.toFixed(2)}ms`}
      </div>
    );
  }
});

export default AccountTab;