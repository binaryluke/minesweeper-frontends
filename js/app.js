(function () {
  'use strict';

  window.BoardStateEnum = minesweeper.BoardStateEnum;
  window.CellStateEnum = minesweeper.CellStateEnum;
  window.CellFlagEnum = minesweeper.CellFlagEnum;
  window.Board = minesweeper.Board;
  window.Cell = minesweeper.Cell;
  window.generateMineArray = minesweeper.generateMineArray;

  var CELL_WIDTH = 48;
  var CELL_HEIGHT = 48;
  var CELL_BORDER_WIDTH = 1;
  var GRID_BORDER_WIDTH = 1;

  var board, timeElapsed = 0;

  var printBoard = function () {
    var i,
        isWonLost = false,
        grid = board.grid();

    if (board.state === BoardStateEnum.WON || board.state === BoardStateEnum.LOST) {
      isWonLost = true;
    }

    $('.ms-grid').empty();
    $('.ms-grid').on('contextmenu', function () { return false; });

    for (i=0; i<board.numRows(); i++) {
      printRow(grid[i], isWonLost, i);
    }

    updateState();
    updateOptions();
  };

  var updateState = function () {
    $('.ms-state').css('width', getRowWidth());
    $('.ms-state-exclamations input').val(getNumExclamations());
    $('.ms-state-time input').val(timeElapsed || 0);
  };

  var updateOptions = function () {
    $('.ms-options').css('width', getRowWidth());
  };

  var onintervalOneSec = function () {
    if (board && board.state() === BoardStateEnum.IN_PROGRESS) {
      timeElapsed += 1;
      updateState();
    }
  };

  var getRowWidth = function () {
    return (CELL_WIDTH + CELL_BORDER_WIDTH * 2) * board.numCols() + GRID_BORDER_WIDTH * 2;
  };

  var getNumExclamations = function () {
    var i, j, result = 0;

    for (i = 0; i < board.numRows(); i++) {
      for (j = 0; j < board.numCols(); j++) {
        if (board.cell(j, i).flag === CellFlagEnum.EXCLAMATION) {
          result += 1;
        }
      }
    }

    return result;
  };

  var printRow = function (rowArray, isWonLost, rowNum) {
    var i,
        cell,
        div,
        length,
        rowClass,
        rowStyle;

    length = rowArray.length;
    rowClass = '.ms-grid-row-' + rowNum;
    rowStyle = 'width: ' + getRowWidth() + 'px;';

    $('.ms-grid').append('<div class="ms-grid-row ' + rowClass.substr(1) + ' group" style="' + rowStyle + '"></div>');

    for (i=0; i<length; i++) {
      cell = rowArray[i];
      div = createCellDiv(cell);
      $(rowClass).append(div);
      div.mousedown(onclickCell);
    }
  };

  var createCellDiv = function (cell) {
    var content = '',
        cssClass = 'ms-grid-cell',
        btnClass = 'btn',
        isOpen = cell.state === CellStateEnum.OPEN,
        div;

    if (isOpen == false) {
      cssClass += ' ms-x-grid-cell-closed';
      if (cell.flag === CellFlagEnum.NONE) {
        content = ' ';
      } else if (cell.flag === CellFlagEnum.EXCLAMATION) {
        content = '!';
      } else if (cell.flag === CellFlagEnum.QUESTION) {
        content = '?';
      }
    } else if (isOpen == true) {
      cssClass += ' ms-x-grid-cell-open';
      if (cell.isMine) {
        content = '*';
      } else {
        content = cell.numAdjacentMines || ' ';
      }
    }

    if (isOpen && cell.isMine) {
      btnClass += ' btn-danger';
    } else if (isOpen) {
      btnClass += ' btn-default';
    }

    div = $('<div class="' + cssClass + '" data-xy="' + cell.x + ','+ cell.y + '"></div>');
    div.append('<button class="' + btnClass + '">' + content + '</button>');

    return div;
  };

  var printState = function () {
    if (board.state() === BoardStateEnum.PRISTINE) {
      $('.ms-state').empty();
      $('.ms-state').append('<span>PRISTINE</span>');
    } else if (board.state() === BoardStateEnum.IN_PROGRESS) {
      $('.ms-state').empty();
      $('.ms-state').append('<span>IN_PROGRESS</span>');
    } else if (board.state() === BoardStateEnum.WON) {
      $('.ms-state').empty();
      $('.ms-state').append('<span>WON</span>');
    } else if (board.state() === BoardStateEnum.LOST) {
      $('.ms-state').empty();
      $('.ms-state').append('<span>LOST</span>');
    } else {
      $('.ms-state').empty();
      $('.ms-state').append('<span>UNKNOWN</span>');
    }
  };

  var onclickCell = function (e) {
    var xy = $(this).data('xy').split(',');
    var x = xy[0];
    var y = xy[1];

    if (e.which === 1) {
      // left click
      openCell(+x, +y);
    } else if (e.which === 3) {
      flagCell(+x, +y);
    }
  };

  var openCell = function (x, y) {
    board.openCell(x, y);
    printBoard();
  };

  var flagCell = function (x, y) {
    board.cycleCellFlag(x, y);
    printBoard();
  };

  var getNewGameParams = function () {
    var rows = $('.ms-options-rows').val() || 10;
    var cols = $('.ms-options-cols').val() || 10;
    var mines = $('.ms-options-mines').val() || 15;

    return {
      rows: +rows,
      cols: +cols,
      mines: +mines
    };
  };

  var setNewGameParams = function (params) {
    if (params.rows) {
      $('.ms-options-rows').val(+params.rows);
    }

    if (params.cols) {
      $('.ms-options-cols').val(+params.cols);
    }
    
    if (params.mines) {
      $('.ms-options-mines').val(+params.mines);
    }
  };

  var updateDifficulty = function (difficulty) {
    var params, rows, cols, mines;
    
    if (difficulty === 'easy') {
      rows = 10;
      cols = 10;
      mines = 15;

    } else if (difficulty === 'medium') {
      rows = 15;
      cols = 15;
      mines = 35;
    } else if (difficulty === 'hard') {
      rows = 20;
      cols = 20;
      mines = 80;
    }
    
    params = {
      rows: rows,
      cols: cols,
      mines: mines
    };

    setNewGameParams(params);
  };

  var onclickNewGame = function () {
    var params = getNewGameParams();
    var mineArray = generateMineArray(params);

    // clean up any cells from existing board
    $('.ms-grid-cell').off('mousedown');

    timeElapsed = 0;
    board = new Board(mineArray);
    printBoard();
  };

  var onclickDifficultyItem = function () {
    var ele = $(this),
        text = ele.data('text'),
        difficulty = ele.data('difficulty');

    $('.ms-options .dropdown button').html(text + '<span class="caret"></span>');
    updateDifficulty(difficulty);
  };
  
  $('.ms-options-new button').click(onclickNewGame);
  $('.ms-options .dropdown li').click(onclickDifficultyItem);

  // let's get this party started
  $('.ms-options .dropdown [data-difficulty="easy"]').click();
  onclickNewGame();

  window.setInterval(onintervalOneSec, 1000);

  
}());