'use strict';

var minesweeper = require('minesweeper');

var Board = minesweeper.Board;
var generateMineArray = minesweeper.generateMineArray;

module.exports = function ($rootScope) {
  var board = new Board(generateMineArray());

  var publishUpdatedEvent = function () {
    $rootScope.$emit('game:updated');
  };

  var publishNewEvent = function () {
    $rootScope.$emit('game:new');
  };
  
  var grid = function () {
    return board.grid();
  };

  var numRows = function () {
    return board.numRows();
  };

  var numCols = function () {
    return board.numCols();
  };

  var state = function () {
    return board.state();
  };

  var start = function (options) {
    var mineArray = generateMineArray(options);
    
    if (mineArray) {
      board = new Board(mineArray);
      publishNewEvent();
    }
  };

  var openCell = function (x, y) {
    board.openCell(x, y);
    publishUpdatedEvent();
  };

  var flagCell = function (x, y) {
    board.cycleCellFlag(x, y);
    publishUpdatedEvent();
  };
  
  return {
    start: start,
    grid: grid,
    openCell: openCell,
    flagCell: flagCell,
    numRows: numRows,
    numCols: numCols,
    state: state
  };
};