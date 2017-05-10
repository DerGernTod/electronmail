import React from 'react';
import { changePassword } from '../../../service/crypto';
let ChangeDbPass = React.createClass({
  getInitialState() {
    return {
      value: '',
      changeDuration: 0,
      changeRunning: false
    };
  },
  handleDbPasswordTextField(evt) {
    this.setState({
      ...this.state,
      value: evt.target.value
    });
  },
  handlePasswordChange(evt) {
    evt.preventDefault();
    let before = performance.now();
    this.setState({
      ...this.state,
      changeRunning: true
    });
    changePassword(this.state.value)
    .then(() => Promise.resolve([true, performance.now() - before]))
    .catch(err => Promise.resolve([false, err]))
    .then(([result, message]) => 
      this.setState({
        ...this.state,
        changeDuration : result ? message : ('error: ' + message)
      })
    );
  },
  render() {
    return (
      <div>
        <h3>Change DB Encoding Password</h3>
        <form onSubmit={this.handlePasswordChange}>
          <input type='text' value={this.state.value} onChange={this.handleDbPasswordTextField} />
          <input type='submit' value='Change db pass' />
        </form>
        {this.state.changeDuration && `Changing db password took ${this.state.changeDuration.toFixed(2)}ms`}
      </div>
    );  
  }
});
export default ChangeDbPass;