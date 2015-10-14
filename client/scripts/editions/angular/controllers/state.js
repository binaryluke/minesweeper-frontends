'use strict';

var angular = require('angular');
var minesweeper = require('minesweeper');

var forEach = angular.forEach;
var BoardStateEnum = minesweeper.BoardStateEnum;
var CellFlagEnum = minesweeper.CellFlagEnum;

module.exports = function ($rootScope, $interval, game) {
  var that = this;

  this.time = 0;
  this.isLost = function () { return game.state() === BoardStateEnum.LOST; };
  this.isWon = function () { return game.state() === BoardStateEnum.WON; };
  this.exclamations = function () {
    var grid = game.grid(), result = 0;

    forEach(grid, function (row) {
      forEach(row, function (cell) {
        if (cell.flag === CellFlagEnum.EXCLAMATION) {
          result += 1;
        }
      });
    });

    return result;
  };

  $interval(function () {
    if (game.state() === BoardStateEnum.IN_PROGRESS) {
      that.time += 1;
    }
  }, 1000);

  $rootScope.$on('game:new', function () {
    that.time = 0;
  });
};