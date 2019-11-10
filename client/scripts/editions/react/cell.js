'use strict';

var React = require('react');
var ms = require('minesweeper');

var CellStateEnum = ms.CellStateEnum;
var CellFlagEnum = ms.CellFlagEnum;

module.exports = React.createClass({
  handleClick: function () {
    var cell = this.props.cell;
    this.props.openCell(cell.x, cell.y);
  },

  handleRightClick: function (e) {
    var cell = this.props.cell;
    e.preventDefault();
    this.props.flagCell(cell.x, cell.y);
  },

  divClasses: function () {
    var cell = this.props.cell,
        classes = ['ms-grid-cell'],
        isOpen = cell.state === CellStateEnum.OPEN;

    if (isOpen === false) {
      classes.push('ms-x-grid-cell-closed');
    } else {
      classes.push('ms-x-grid-cell-open');
    }

    return classes.join(' ');
  },

  btnClasses: function () {
    var cell = this.props.cell,
        classes = ['btn'],
        isOpen = cell.state === CellStateEnum.OPEN;

    if (isOpen && cell.isMine) {
      classes.push('btn-danger');
    } else if (isOpen) {
      classes.push('btn-default');
      classes.push('cell-open-btn')
    }

    return classes.join(' ');
  },

  content: function () {
    var cell = this.props.cell,
        content = '',
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

    return content;
  },

  render: function () {
    return (
      <div className={this.divClasses()}>
        <button className={this.btnClasses()}
                onClick={this.handleClick}
                onContextMenu={this.handleRightClick}>
          {this.content()}
        </button>
      </div>
    );
  }
});
