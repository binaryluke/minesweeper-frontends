'use strict';

var React = require('react');
var Row = require('./row');

module.exports = React.createClass({
  getInitialState: function () {
    var i, rows = [];

    for (i = 0; i < this.props.numRows; i++) {
      rows.push(
        <Row rowIdx={i}
             numCols={this.props.numCols}
             board={this.props.board} />
      );
    }

    return {rows: rows};
  },

  render: function () {
    return (
      <div className="ms-grid">
        {this.state.rows}
      </div>
    );
  }
});