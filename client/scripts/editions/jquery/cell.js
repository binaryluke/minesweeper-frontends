'use strict';

var $ = require('jquery');
var minesweeper = require('minesweeper');

var CellStateEnum = minesweeper.CellStateEnum;
var CellFlagEnum = minesweeper.CellFlagEnum;

var render = function (cell) {
  var content = '',
      cssClass = 'ms-grid-cell',
      btnClass = 'btn',
      isOpen = cell.state === CellStateEnum.OPEN,
      div;

  if (isOpen === false) {
    cssClass += ' ms-x-grid-cell-closed';
    if (cell.flag === CellFlagEnum.NONE) {
      content = ' ';
    } else if (cell.flag === CellFlagEnum.EXCLAMATION) {
      content = '!';
    } else if (cell.flag === CellFlagEnum.QUESTION) {
      content = '?';
    }
  } else if (isOpen === true) {
    cssClass += ' ms-x-grid-cell-open';
    if (cell.isMine) {
      content = '*';
    } else {
      content = cell.numAdjacentMines || ' ';
    }
  }

  if (isOpen && cell.isMine) {
    btnClass += ' btn-danger';
  } else if (isOpen) {
    btnClass += ' btn-default';
  }

  div = $('<div class="' + cssClass + '" data-xy="' + cell.x + ','+ cell.y + '"></div>');
  div.append('<button class="' + btnClass + '">' + content + '</button>');

  return div;
};

module.exports = {
  render: render
};