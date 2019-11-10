'use strict';

var React = require('react');
var Cell = require('./cell');

module.exports = React.createClass({
  render: function () {
    var that = this;

    var getCells = function () {
      return that.props.cells.map(function (cell, idx) {
        return (
          <Cell key={idx}
                cell={cell}
                openCell={that.props.openCell}
                flagCell={that.props.flagCell} />
        );
      });
    };

    return (
      <div className="ms-grid-row group">
        {getCells()}
      </div>
    );
  }
});
