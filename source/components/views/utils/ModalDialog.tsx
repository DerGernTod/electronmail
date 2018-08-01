import * as React from 'react';

interface ModalDialogProps {
  onAccept: () => void;
  onAbort: () => void;
  header?: string;
  message: string;
  enabled: boolean;
  spinEnabled: boolean;
}


class ModalDialog extends React.Component<ModalDialogProps> {
  getDefaultProps(): ModalDialogProps {
    return {
      onAccept: () => {},
      onAbort: () => {},
      header: 'This is a modal dialog',
      message: 'This is the message. It can be longer than the header.',
      enabled: false,
      spinEnabled: false
    };
  }

  handle(accepted: boolean, evt: React.MouseEvent) {
    //stop propagation so that abort is not called additionally if accept is clicked
    //this makes it possible to click anywhere to abort
    evt.stopPropagation();
    if (accepted) {
      this.props.onAccept();
    } else {
      this.props.onAbort();
    }
  }

  render() {
    let className = `modal-dialog ${this.props.enabled ? 'enabled' : ''}`;
    return (

      <div className={className} onClick={this.handle.bind(this, false)}>
        <div className='modal-item'>
          <h4>{this.props.header}</h4>
          <div>{this.props.message}</div>
          <div>
            <button disabled={this.props.spinEnabled} onClick={(e) => this.handle(false, e)}>Abort</button>
            <button disabled={this.props.spinEnabled} onClick={(e) => this.handle(true, e)}>
              {this.props.spinEnabled ? 'Working on it...' : 'Accept'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ModalDialog;
