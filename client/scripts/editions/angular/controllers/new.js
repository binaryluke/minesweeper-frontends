'use strict';

module.exports = function ($rootScope, game) {
  this.rows = 10;
  this.cols = 10;
  this.mines = 15;
  this.difficulty = 'Easy';

  this.updateDifficulty = function (difficulty) {
    if (difficulty === 'Easy') {
      this.rows = 10;
      this.cols = 10;
      this.mines = 15;
      this.difficulty = 'Easy';
    } else if (difficulty === 'Medium') {
      this.rows = 15;
      this.cols = 15;
      this.mines = 35;
      this.difficulty = 'Medium';
    } else if (difficulty === 'Hard') {
      this.rows = 20;
      this.cols = 20;
      this.mines = 80;
      this.difficulty = 'Hard';
    } else {
      this.difficulty = 'Custom';
    }
  };

  this.onsubmit = function () {
    game.start({
      rows: this.rows,
      cols: this.cols,
      mines: this.mines
    });
  };
};