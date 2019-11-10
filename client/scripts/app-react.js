/*!
 * Minesweeper frontends
 * https://github.com/binaryluke/minesweeper-frontends.git
 *
 * Copyright 2015, Luke Howard (@binaryluke)
 *
 * Released under the MIT license
 */

require('jquery');
var bootstrap = require('bootstrap');
var React = require('react');
var ReactDOM = require('react-dom');
var Minesweeper = require('./editions/react/minesweeper');
var Header = require('./editions/react/header');
var Footer = require('./editions/react/footer');

require('bootstrap/dist/css/bootstrap.min.css');
require('../styles/app.css');
require('../styles/layout/layout.css');
require('../styles/modules/grid.css');
require('../styles/modules/new.css');
require('../styles/modules/state.css');

const appNode = document.createElement('div');
appNode.className = 'app';
document.querySelector('body').append(appNode);

const App = function () {
  return (
    <div>
      <Header />
      <Minesweeper />
      <Footer />
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.querySelector('.app')
);
