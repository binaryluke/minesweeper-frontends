'use strict';

var React = require('react');
var Cell = require('./cell');

module.exports = React.createClass({
  getInitialState: function () {
    var i, cells = [];

    for (i = 0; i < this.props.numCols; i++) {
      cells.push(<Cell rowIdx={this.props.rowIdx}
                       colIdx={i}
                       board={this.props.board} />
      );
    }

    return {cells: cells};
  },

  render: function () {
    return (
      <div className="ms-grid-row group">
        {this.state.cells}
      </div>
    );
  }
});