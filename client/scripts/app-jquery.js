/*!
 * Minesweeper frontends
 * https://github.com/binaryluke/minesweeper-frontends.git
 *
 * Copyright 2015, Luke Howard (@binaryluke)
 *
 * Released under the MIT license
 * http://lukehoward.name/project/minesweeper/license
 */

'use strict';

/**
 *  Imports
 */

var $ = require('jquery');
var bootstrap = require('bootstrap');
var minesweeper = require('minesweeper');
var uiBoard = require('./editions/jquery/board');
var uiState = require('./editions/jquery/state');
var uiNew = require('./editions/jquery/new');
var template = require('../templates/editions/jquery/app.html');

/**
 *  Constants
 */

var CELL_WIDTH = 50;
var CELL_HEIGHT = 50;
var CELL_BORDER_WIDTH = 0;
var GRID_BORDER_WIDTH = 0;

/**
 *  Aliases
 */

var BoardStateEnum = minesweeper.BoardStateEnum;
var CellStateEnum = minesweeper.CellStateEnum;
var CellFlagEnum = minesweeper.CellFlagEnum;
var Board = minesweeper.Board;
var Cell = minesweeper.Cell;
var generateMineArray = minesweeper.generateMineArray;

/**
 *  Module variables
 */
 
var board, timeElapsed = 0, container = $('.ms');

var render = function () {
  var i,
      isWonLost = false,
      grid = board.grid(),
      gridDiv = container.find('.ms-grid'),
      stateDiv = container.find('.ms-state'),
      newDiv = container.find('.ms-new'),
      width = getRowWidth();

  // render the board (if necessary)
  if (board.state !== BoardStateEnum.WON && board.state !== BoardStateEnum.LOST) {
    uiBoard.render(gridDiv, board, width);
  }

  // render the state display
  uiState.render(stateDiv, board, width, timeElapsed);

  // render the new game options display
  uiNew.render(newDiv, width);
  
  // make sure the body is large enough to contain it all
  $('body').css('min-width', width);
};

var flagCell = function (x, y) {
  board.cycleCellFlag(x, y);
  render();
};

var openCell = function (x, y) {
  board.openCell(x, y);
  render();
};

var onintervalOneSec = function () {
  var stateDiv, width;

  if (board && board.state() === BoardStateEnum.IN_PROGRESS) {
    stateDiv = container.find('.ms-state');
    width = getRowWidth();
    timeElapsed += 1;
    uiState.render(stateDiv, board, width, timeElapsed);
  }
};

var getRowWidth = function () {
  return (CELL_WIDTH + CELL_BORDER_WIDTH * 2) * board.numCols() + GRID_BORDER_WIDTH * 2;
};

var newGame = function (options) {
  options = options || {};
  timeElapsed = 0;
  board = new Board(generateMineArray(options));
  render();
};


// setup
container.html(template);
uiBoard.addOnFlagCellHandler(flagCell);
uiBoard.addOnOpenCellHandler(openCell);
uiNew.addOnNewGameHandler(newGame);
setInterval(onintervalOneSec, 1000);

// party time!
newGame();