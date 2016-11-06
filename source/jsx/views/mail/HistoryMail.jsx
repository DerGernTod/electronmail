import React from 'react';
const HistoryMail = React.createClass({
    getInitialState(){
        return {};
    },
    componentWillReceiveProps(){
        this.setState({

        });
    },
    render(){
        return (
            <div className='history-mail-single'>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
});
export default HistoryMail;