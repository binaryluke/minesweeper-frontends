'use strict';

var $ = require('jquery');
var minesweeper = require('minesweeper');
var template = require('../../../templates/editions/jquery/state.html');

var BoardStateEnum = minesweeper.BoardStateEnum;
var CellFlagEnum = minesweeper.CellFlagEnum;

var render = function (container, board, width, timeElapsed) {
  var stateHtml = '',
      div = $(container);

  if (div.html() === '') {
    renderTemplate(container);
  }

  if (board.state() === BoardStateEnum.WON) {
    stateHtml += '<span class="ms-state-winlose-won">YOU WON</span>';
  } else if (board.state() === BoardStateEnum.LOST) {
    stateHtml += '<span class="ms-state-winlose-lost">YOU LOST</span>';
  }

  div.css('width', width);
  div.find('.ms-state-exclamations input').val(getNumExclamations(board));
  div.find('.ms-state-time input').val(timeElapsed || 0);
  div.find('.ms-state-winlose').html(stateHtml);
};

var renderTemplate = function (container) {
  $(container).html(template);
};

var getNumExclamations = function (board) {
  var i, j, result = 0;

  for (i = 0; i < board.numRows(); i++) {
    for (j = 0; j < board.numCols(); j++) {
      if (board.cell(j, i).flag === CellFlagEnum.EXCLAMATION) {
        result += 1;
      }
    }
  }

  return result;
};

module.exports = {
  render: render
};