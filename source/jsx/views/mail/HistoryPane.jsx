import React from 'react';
import HistoryMail from './HistoryMail.jsx';
const HistoryPane = React.createClass({
    componentWillReceiveProps(nextProps){
        this.setState({
            history : nextProps.history || []
        });
    },
    getInitialState(){
        return { history : []};
    },
    render(){
        var key = 0;
        var historyMails = this.state.history.map(function(value){

            return (
                <HistoryMail
                    key={key++} 
                    author={value.author} 
                    recipients={value.recipients}>
                    {value.content}
                </HistoryMail>);
        });
        return (
            <div>
                {historyMails}
            </div>
        );
    }
});
export default HistoryPane;