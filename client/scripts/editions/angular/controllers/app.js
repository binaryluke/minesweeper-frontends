'use strict';

/**
 *  Constants
 */

var CELL_WIDTH = 50;
var CELL_HEIGHT = 50;
var APP_PADDING_WIDTH = 10;

module.exports = function ($rootScope, game) {
  var that = this;

  this.width = function () {
    return CELL_WIDTH * game.numCols();
  };
  
  this.appPaddingWidth = APP_PADDING_WIDTH;
};