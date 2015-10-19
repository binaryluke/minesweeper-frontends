'use script';

var React = require('react');
var Difficulty = require('./difficulty');
var Input = require('./input');
var Errors = require('./errors');

var DIFFICULTIES = ['easy', 'medium', 'hard', 'custom'];

// credit:
// https://developer.mozilla.org/
//  en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
var isInteger = function(value) {
    return typeof value === "number" && 
           isFinite(value) && 
           Math.floor(value) === value;
};

module.exports = React.createClass({
  getInitialState: function () {
    return {
      rows: 10,
      cols: 10,
      mines: 15,
      difficulty: 'easy',
      minRows: 10,
      maxRows: 30,
      minCols: 10,
      maxCols: 30,
      minMines: 1
    };
  },

  notifyChange: function (name, value) {
    var obj = {};

    if (value && ['rows', 'cols', 'mines'].indexOf(name) !== -1) {
      obj[name] = +value;
      this.setState(obj);
    }
  },

  changeDifficulty: function (difficulty) {
    var state = {};

    if (difficulty === 'easy') {
      state.rows = 10;
      state.cols = 10;
      state.mines = 15;
      state.difficulty = 'easy';
    } else if (difficulty === 'medium') {
      state.rows = 15;
      state.cols = 15;
      state.mines = 35;
      state.difficulty = 'medium';
    } else if (difficulty === 'hard') {
      state.rows = 20;
      state.cols = 20;
      state.mines = 80;
      state.difficulty = 'hard';
    } else if (difficulty === 'custom') {
      state.difficulty = 'custom';
    }

    this.setState(state);
  },

  handleSubmit: function (e) {
    var options = {
      rows: this.state.rows,
      cols: this.state.cols,
      mines: this.state.mines
    };

    e.preventDefault();

    if (!this.hasErrors()) {
      this.props.newGame(options);
    }
  },

  maxMines: function () {
    return this.state.rows * this.state.cols;
  },

  hasMinRowError: function () { return this.state.rows < this.state.minRows; },
  hasMaxRowError: function () { return this.state.rows > this.state.maxRows; },
  hasIntRowError: function () { return !isInteger(this.state.rows); },
  hasMinColError: function () { return this.state.cols < this.state.minCols; },
  hasMaxColError: function () { return this.state.cols > this.state.maxCols; },
  hasIntColError: function () { return !isInteger(this.state.cols); },
  hasMinMineError: function () { return this.state.mines < this.state.minMines; },
  hasMaxMineError: function () { return this.state.mines > this.maxMines(); },
  hasIntMineError: function () { return !isInteger(this.state.mines); },
  hasErrors: function () {
    var hasErrors = false;

    if (this.hasMinRowError()
          || this.hasMaxRowError()
          || this.hasIntRowError()
          || this.hasMinColError()
          || this.hasMaxColError()
          || this.hasIntColError()
          || this.hasMinMineError()
          || this.hasMaxMineError()
          || this.hasIntMineError()) {
      hasErrors = true;
    }

    return hasErrors;
  },

  render: function () {
    var isReadonly = this.state.difficulty === 'custom' ? false : true;
    var minMines = 1;

    return (
      <div className="ms-new group">
        <form onSubmit={this.handleSubmit} noValidate>
          <Difficulty difficulty={this.state.difficulty}
                      changeDifficulty={this.changeDifficulty} />
          <div className="ms-new-new">
            <input type="submit" 
                   className="btn btn-success"
                   value="New Game" />
          </div>
          <div className="ms-new-custom">
            <Errors hasMinRowError={this.hasMinRowError}
                    hasMaxRowError={this.hasMaxRowError}
                    hasIntRowError={this.hasIntRowError}
                    hasMinColError={this.hasMinColError}
                    hasMaxColError={this.hasMaxColError}
                    hasIntColError={this.hasIntColError}
                    hasMinMineError={this.hasMinMineError}
                    hasMaxMineError={this.hasMaxMineError}
                    hasIntMineError={this.hasIntMineError}
                    minRows={this.state.minRows}
                    maxRows={this.state.maxRows}
                    minCols={this.state.minCols}
                    maxCols={this.state.maxCols}
                    minMines={minMines}
                    maxMines={this.maxMines()} />
            <div className="ms-new-custom-fields">
              <Input name="rows"
                     text="Rows"
                     notifyChange={this.notifyChange}
                     readonly={isReadonly}
                     min={this.state.minRows}
                     max={this.state.maxRows}
                     step="1"
                     value={this.state.rows} />
              <Input name="cols"
                     text="Cols"
                     notifyChange={this.notifyChange}
                     readonly={isReadonly}
                     min={this.state.minCols}
                     max={this.state.maxCols}
                     step="1"
                     value={this.state.cols} />
              <Input name="mines"
                     text="Mines"
                     notifyChange={this.notifyChange}
                     readonly={isReadonly}
                     min={minMines}
                     max={this.maxMines()}
                     step="1"
                     value={this.state.mines} />
            </div>
          </div>
        </form>
      </div>
    );
  }

});