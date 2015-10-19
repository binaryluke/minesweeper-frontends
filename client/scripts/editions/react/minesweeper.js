'use strict';

var React = require('react');
var New = require('./new');
var Board = require('./board');
var State = require('./state');
var ms = require('minesweeper');

var CELL_WIDTH = 50;
var CELL_HEIGHT = 50;
var APP_PADDING_WIDTH = 10;

var createBoard = function (options) {
  var mineArray = ms.generateMineArray(options);
  return new ms.Board(mineArray);
};

module.exports = React.createClass({
  getInitialState: function () {
    return {
      board: createBoard(),
      time: 0
    };
  },

  componentWillMount: function () {
    this.intervalHandle = setInterval(this.handleInterval, 1000);
  },

  componentWillUnmount: function () {
    clearInterval(this.intervalHandle);
  },

  handleInterval: function () {
    if (this.state.board.state() === ms.BoardStateEnum.IN_PROGRESS) {
      this.setState({
        time: this.state.time + 1
      });
    }
  },

  openCell: function (x, y) {
    this.state.board.openCell(x, y);
    this.setState({});
  },

  flagCell: function (x, y) {
    this.state.board.cycleCellFlag(x, y);
    this.setState({});
  },

  newGame: function (options) {
    var board = createBoard(options);
    this.setState({
      board: board,
      time: 0
    });
  },

  render: function () {
    var that = this;

    var isWon = this.state.board.state() === ms.BoardStateEnum.WON 
                ? true : false;
    var isLost = this.state.board.state() === ms.BoardStateEnum.LOST 
                ? true : false;

    var exclamations = function () {
      var grid = that.state.board.grid(), result = 0;

      grid.forEach(function (row) {
        row.forEach(function (cell) {
          if (cell.flag === ms.CellFlagEnum.EXCLAMATION) {
            result += 1;
          }
        });
      });

      return result;
    };

    var getStyles = function () {
      var width = CELL_WIDTH * that.state.board.numCols() 
                    + APP_PADDING_WIDTH * 2;
      return {
        width: width
      };
    };

    return (
      <div className="ms" style={getStyles()}>
        <New newGame={this.newGame} />
        <Board grid={this.state.board.grid()}
               openCell={this.openCell}
               flagCell={this.flagCell} />
        <State isWon={isWon}
               isLost={isLost}
               exclamations={exclamations()}
               time={this.state.time} />
      </div>
    );
  }
});