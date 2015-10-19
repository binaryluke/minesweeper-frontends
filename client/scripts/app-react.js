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

var bootstrap = require('bootstrap');
var React = require('react');
var ReactDOM = require('react-dom');
var Minesweeper = require('./editions/react/minesweeper');

ReactDOM.render(
  <Minesweeper />,
  document.querySelector('.app-container')
);