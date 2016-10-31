import React from 'react';
import HistoryMail from './HistoryMail.jsx';
const HistoryPane = React.createClass({
    render : function(){
        return (
            <div>
                <h2>History pane!</h2>
                <HistoryMail />
            </div>
        );
    }
});
export default HistoryPane;