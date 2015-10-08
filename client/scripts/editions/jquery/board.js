'use strict';

var $ = require('jquery');
var minesweeper = require('minesweeper');
var uiRow = require('./row.js');

var onOpenCellHandlers = [],
    onFlagCellHandlers = [];

var render = function (container, board, width) {
  var i,
      grid = board.grid(),
      div = $(container);

  // clean up any cells from existing board
  //   to ensure they can be garbage collected
  div.off('contextmenu');
  div.find('.ms-grid-cell').off('mousedown');

  // empty existing dom elements from previous draw
  //   in preparation for redraw
  div.empty();
  div.on('contextmenu', function () { return false; });

  // set board width
  div.width(width);

  // redraw the board
  for (i=0; i<board.numRows(); i++) {
    div.append(uiRow.render(grid[i], width));
  }

  // add click events for cells
  div.find('.ms-grid-cell').on('mousedown', onclickCell);
};

var onclickCell = function (e) {
  var xy = $(this).data('xy').split(',');
  var x = xy[0];
  var y = xy[1];

  if (e.which === 1) {
    // left click
    callHandlers(onOpenCellHandlers, +x, +y);
  } else if (e.which === 3) {
    // right click
    callHandlers(onFlagCellHandlers, +x, +y);
  }
};

var addOnOpenCellHandler = function (fn) {
  onOpenCellHandlers.push(fn);
};

var addOnFlagCellHandler = function (fn) {
  onFlagCellHandlers.push(fn);
};

var callHandlers = function (handlers, x, y) {
  var idx;

  for (idx = 0; idx < handlers.length; idx++) {
    (handlers[idx])(x, y);
  }
};

module.exports = {
  render: render,
  addOnFlagCellHandler: addOnFlagCellHandler,
  addOnOpenCellHandler: addOnOpenCellHandler
};