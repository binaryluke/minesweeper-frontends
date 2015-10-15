'use strict';

var React = require('react');
var ms = require('minesweeper');

var CellStateEnum = ms.CellStateEnum;
var CellFlagEnum = ms.CellFlagEnum;

module.exports = React.createClass({
  getInitialState: function () {
    var cell = this.props.board.cell(this.props.colIdx, this.props.rowIdx);
    return {cell: cell};
  },

  componentDidMount: function () {
    this.intervalHandle = setInterval(this.getUpdatedCell, 200);
  },

  componentWillUnmount: function () {
    clearInterval(this.intervalHandle);
  },

  getUpdatedCell: function () {
    var cell = this.props.board.cell(this.props.colIdx, this.props.rowIdx);
    this.setState({cell: cell});
  },

  divClasses: function () {
    var cell = this.state.cell,
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
    var cell = this.state.cell,
        classes = ['btn'],
        isOpen = cell.state === CellStateEnum.OPEN;

    if (isOpen && cell.isMine) {
      classes.push('btn-danger');
    } else if (isOpen) {
      classes.push('btn-default');
    }

    return classes.join(' ');
  },

  content: function () {
    var cell = this.state.cell,
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
        <button className={this.btnClasses()}>
          {this.content()}
        </button>
      </div>
    );
  }
});