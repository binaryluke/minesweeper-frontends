'use strict';

var React = require('react');
var BoardRow = require('./board-row');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <h2>A board box</h2>
        <BoardRow />
      </div>
    );
  }
});