import * as React from 'react';
import { changePassword } from '@/service/crypto';

interface ChangeDbPassState {
  value: string;
  changeDuration: number;
  changeRunning: boolean;
}

class ChangeDbPass extends React.Component<null, ChangeDbPassState> {
  getInitialState() {
    return {
      value: '',
      changeDuration: 0,
      changeRunning: false
    };
  }

  handleDbPasswordTextField(evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      value: evt.target.value
    });
  }

  handlePasswordChange(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    let before = performance.now();
    this.setState({
      changeRunning: true
    });
    changePassword(this.state.value)
    .then(() => Promise.resolve([true, performance.now() - before]))
    .catch(err => Promise.resolve([false, err]))
    .then(([result, message]) =>
      this.setState({
        changeDuration : result ? message : ('error: ' + message)
      })
    );
  }
  render() {
    return (
      <div>
        <h3>Change DB Encoding Password</h3>
        <form onSubmit={e => this.handlePasswordChange(e)}>
          <input type='text' value={this.state.value} onChange={(e) => this.handleDbPasswordTextField(e)} />
          <input type='submit' value='Change db pass' />
        </form>
        {this.state.changeDuration && `Changing db password took ${this.state.changeDuration.toFixed(2)}ms`}
      </div>
    );
  }
}
export default ChangeDbPass;
