'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function () {
    var that = this;
    var wonDiv = <span className="ms-state-winlose-won">YOU WON</span>;
    var lostDiv = <span className="ms-state-winlose-lost">YOU LOST</span>;
    var getDiv = function () {
      if (that.props.isWon) {
        return wonDiv;
      } else if (that.props.isLost) {
        return lostDiv;
      } else {
        return <span />;
      }
    };

    return (
      <div className="ms-state">
        <div className="ms-state-exclamations">
          <div className="input-group">
            <span className="input-group-addon">
              <span className="glyphicon glyphicon-exclamation-sign"></span>
            </span>
            <input className="form-control" 
                   value={this.props.exclamations}
                   readOnly />
          </div>
        </div>
        <div className="ms-state-time">
          <div className="input-group">
            <span className="input-group-addon">
              <span className="glyphicon glyphicon-time"></span>
            </span>
            <input className="form-control" value={this.props.time} readOnly />
          </div>
        </div>
        <div className="ms-state-winlose">
          {getDiv()}
        </div>
      </div>
    );
  }
});