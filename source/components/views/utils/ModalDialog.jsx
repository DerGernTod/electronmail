import React from 'react';

const ModalDialog = React.createClass({
  propTypes: {
    onAccept: React.PropTypes.func.isRequired,
    onAbort: React.PropTypes.func.isRequired,
    header: React.PropTypes.string,
    message: React.PropTypes.string.isRequired,
    enabled: React.PropTypes.bool,
    spinEnabled: React.PropTypes.bool
  },
  getDefaultProps() {
    return {
      onAccept: () => {},
      onAbort: () => {},
      header: 'This is a modal dialog',
      message: 'This is the message. It can be longer than the header.',
      enabled: false,
      spinEnabled: false
    };
  },
  getInitialState() {
    return { enabled: false, spinEnabled: false };
  },
  handle(accepted, evt) {
    //stop propagation so that abort is not called additionally if accept is clicked
    //this makes it possible to click anywhere to abort
    evt.stopPropagation();
    if (accepted) {
      this.props.onAccept();
    } else {
      this.props.onAbort();
    }
  },
  componentWillReceiveProps(newProps) {
    this.setState({
      enabled: newProps.enabled,
      spinEnabled: newProps.spinEnabled
    });
  },
  render() {
    let className = `modal-dialog ${this.state.enabled ? 'enabled' : ''}`;
    return (

      <div className={className} onClick={this.handle.bind(this, false)}>
        <div className='modal-item'>
          <h4>{this.props.header}</h4>
          <div>{this.props.message}</div>
          <div>
            <button disabled={this.state.spinEnabled} onClick={this.handle.bind(this, false)}>Abort</button>
            <button disabled={this.state.spinEnabled} onClick={this.handle.bind(this, true)}>
              {this.state.spinEnabled ? 'Working on it...' : 'Accept'}
            </button>
          </div>
        </div>
      </div>
    );
  }
});
export default ModalDialog;