'use strict';

var angular = require('angular');
var minesweeper = require('minesweeper');
var deepExtend = require('deep-extend');

var CellStateEnum = minesweeper.CellStateEnum;
var CellFlagEnum = minesweeper.CellFlagEnum;

module.exports = function ($rootScope, game) {
  var that = this;
  
  this.grid = game.grid();

  this.cellClass = function (cell) {
    var classes = ['ms-grid-cell'],
        isOpen = cell.state === CellStateEnum.OPEN;

    if (isOpen === false) {
      classes.push('ms-x-grid-cell-closed');
    } else {
      classes.push('ms-x-grid-cell-open');
    }

    return classes;
  };

  this.buttonClass = function (cell) {
    var classes = ['btn'],
        isOpen = cell.state === CellStateEnum.OPEN;

    if (isOpen && cell.isMine) {
      classes.push('btn-danger');
    } else if (isOpen) {
      classes.push('btn-default');
    }

    return classes;
  };

  this.content = function (cell) {
    var content = '',
        isOpen = cell.state === CellStateEnum.OPEN;

    if (isOpen === false) {
      if (cell.flag === CellFlagEnum.NONE) {
        content = ' ';
      } else if (cell.flag === CellFlagEnum.EXCLAMATION) {
        content = '!';
      } else if (cell.flag === CellFlagEnum.QUESTION) {
        content = '?';
      }
    } else if (isOpen === true) {
      if (cell.isMine) {
        content = '*';
      } else {
        content = cell.numAdjacentMines || ' ';
      }
    }

    this.openCell = function (cell) {
      game.openCell(cell.x, cell.y);
    };

    this.flagCell = function (cell) {
      game.flagCell(cell.x, cell.y);
    };

    return content;
  };

  $rootScope.$on('game:new', function () {
    that.grid = game.grid();
  });
};