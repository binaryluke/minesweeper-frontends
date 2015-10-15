'use strict';

var React = require('react');
var BoardCell = require('./board-cell');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <h2>A board row</h2>
        <BoardCell />
      </div>
    );
  }
});