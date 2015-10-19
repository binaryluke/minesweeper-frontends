'use strict';

var React = require('react');

var errorsEnum = {
  MIN_ROWS_COLS: 'We\'d all like things to be that easy, but the world doesn\'t'
                   + ' work that way.  Keep the rows and columns at or above '
                   + '{0}, yeah?',
  MAX_ROWS_COLS: 'That many rows and columns might just cause the universe' 
                   + ' to implode. Keep the rows and columns to less than {0}'
                   + ', yeah?',
  MIN_MINES: 'You wanted to one-shot the board, yeah? Caught you red handed!',
  MAX_MINES: 'You realise that\'s more mines than there are cells, yeah?',
  NOT_INT: 'I don\'t get your meaning, try again!'
};

var getErrorDiv = function (content) {
  if (content) {
    return <div><span>Warning! </span><span>{content}</span></div>;
  } else {
    return <div />;
  }
};

var getErrorContent = function (key, minMax) {
  return errorsEnum[key].replace('{0}', minMax);
};

module.exports = React.createClass({ 
  render: function () {
    var style = {}, rowContent, colContent, minesContent;

    if (this.props.hasMinRowError()) {
      rowContent = getErrorContent('MIN_ROWS_COLS', this.props.minRows);
    } else if (this.props.hasMaxRowError()) {
      rowContent = getErrorContent('MAX_ROWS_COLS', this.props.maxRows);
    } else if (this.props.hasIntRowError()) {
      rowContent = getErrorContent('NOT_INT', '');
    } else if (this.props.hasMinColError()) {
      colContent = getErrorContent('MIN_ROWS_COLS', this.props.minCols);
    } else if (this.props.hasMaxColError()) {
      colContent = getErrorContent('MAX_ROWS_COLS', this.props.maxCols);
    } else if (this.props.hasIntColError()) {
      colContent = getErrorContent('NOT_INT', '');
    } else if (this.props.hasMinMineError()) {
      mineContent = getErrorContent('MIN_ROWS_COLS', this.props.minMines);
    } else if (this.props.hasMaxMineError()) {
      mineContent = getErrorContent('MAX_ROWS_COLS', this.props.maxMines);
    } else if (this.props.hasIntMineError()) {
      mineContent = getErrorContent('NOT_INT', '');
    } else {
      style.display = 'none';
    }

    return (
      <div className="ms-new-custom-warn" style={style}>
        {getErrorDiv(rowContent)}
        {getErrorDiv(colContent)}
        {getErrorDiv(minesContent)}
      </div>
    );
  }
});