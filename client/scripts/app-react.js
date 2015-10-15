/*!
 * Minesweeper frontends
 * https://github.com/binaryluke/minesweeper-frontends.git
 *
 * Copyright 2015, Luke Howard (@binaryluke)
 *
 * Released under the MIT license
 * http://lukehoward.name/project/minesweeper/license
 */

'use script';

var ms = require('minesweeper');
var bootstrap = require('bootstrap');
var React = require('react');
var ReactDOM = require('react-dom');
var Board = require('./editions/react/board');

window.newGame = function (options) {
  var mineArray = ms.generateMineArray(options);
  var board = new ms.Board(mineArray);
  var div = document.querySelector('.app-container');

  ReactDOM.unmountComponentAtNode(div);

  ReactDOM.render(
    <Board numRows={board.numRows()}
           numCols={board.numCols()}
           board={board} />,
    div
  );

  window.board = board;
};