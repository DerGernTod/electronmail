import React from 'react';
import HistoryMail from './HistoryMail.jsx';
const HistoryPane = React.createClass({
    componentWillReceiveProps(){
        this.setState({
            history : this.props.history || []
        });
    },
    getInitialState(){
        return { history : []};
    },
    render(){
        var historyMails = this.state.history.map(function(value){
            return (<HistoryMail author={value.author} recipients={value.recipients}>{value.content}</HistoryMail>);
        });
        return (
            <div>
                {historyMails}
            </div>
        );
    }
});
export default HistoryPane;