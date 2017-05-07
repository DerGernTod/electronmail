import React from 'react';

const ModalDialog = React.createClass({
  propTypes: {
    onAccept: React.PropTypes.func,
    onAbort: React.PropTypes.func,
    header: React.PropTypes.string,
    message: React.PropTypes.string,
    enabled: React.PropTypes.bool
  },
  getDefaultProps() {
    return {
      onAccept: () => {},
      onAbort: () => {},
      header: 'This is a modal dialog',
      message: 'This is the message. It can be longer than the header.',
      enabled: false
    };
  },
  getInitialState() {
    return { enabled: false };
  },
  handle(accepted, evt) {
    evt.stopPropagation();
    if (accepted) {
      this.props.onAccept();
    } else {
      this.props.onAbort();
    }
  },
  componentWillReceiveProps(newProps) {
    if (newProps.enabled !== this.props.enabled) {
      this.setState({
        enabled: newProps.enabled
      });
    }
  },
  render() {
    let className = `modal-dialog ${this.state.enabled ? 'enabled' : ''}`;
    return (

      <div className={className} onClick={this.handle.bind(this, false)}>
        <div className='modal-item'>
          <h4>{this.props.header}</h4>
          <div>{this.props.message}</div>
          <div>
            <button onClick={this.handle.bind(this, false)}>Abort</button>
            <button onClick={this.handle.bind(this, true)}>Accept</button>
          </div>
        </div>
      </div>
    );
  }
});
export default ModalDialog;