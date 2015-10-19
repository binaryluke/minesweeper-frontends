'use strict';

var React = require('react');
var Row = require('./row');
var ms = require('minesweeper');

module.exports = React.createClass({
  render: function () {
    var that = this;

    var getRows = function () {
      return that.props.grid.map(function (row) {
        return (
          <Row cells={row} 
               openCell={that.props.openCell}
               flagCell={that.props.flagCell} />
        );
      });
    };
    
    return (
      <div className="ms-grid">
        {getRows()}
      </div>
    );
  }
});