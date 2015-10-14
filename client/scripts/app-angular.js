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

var angular = require('angular');
var bootstrap = require('bootstrap');

var app = angular.module('ms', []);

/**
 *  Services
 */

app.factory('game', [
  '$rootScope',
  require('./editions/angular/services/game')
]);

/**
 *  Directives
 */

app.directive('integer',
  require('./editions/angular/directives/integer'));

app.directive('rightclick', [
  '$parse',
  require('./editions/angular/directives/rightclick')
]);

/**
 *  Controllers
 */

app.controller('AppController', [
  '$rootScope',
  'game',
  require('./editions/angular/controllers/app')
]);

app.controller('NewController', [
  '$rootScope',
  'game',
  require('./editions/angular/controllers/new')
]);

app.controller('BoardController', [
  '$rootScope',
  'game',
  require('./editions/angular/controllers/board')
]);

app.controller('StateController', [
  '$rootScope',
  '$interval',
  'game',
  require('./editions/angular/controllers/state')
]);