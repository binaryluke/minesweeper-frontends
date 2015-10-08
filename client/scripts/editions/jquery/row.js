'use strict';

var $ = require('jquery');
var uiCell = require('./cell');

var render = function (cellArray, width) {
  var i,
      cell,
      rowDiv,
      cellDiv,
      length,
      rowStyle;

  length = cellArray.length;
  rowStyle = 'width: ' + width + 'px;';

  rowDiv = $('<div class="ms-grid-row group" style="' + rowStyle + '"></div>');

  for (i=0; i<length; i++) {
    cell = cellArray[i];
    cellDiv = uiCell.render(cell);
    rowDiv.append(cellDiv);
  }

  return rowDiv;
};

module.exports = {
  render: render
};