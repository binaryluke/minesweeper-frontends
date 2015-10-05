(function () {
  window.BoardStateEnum = minesweeper.BoardStateEnum;
  window.CellStateEnum = minesweeper.CellStateEnum;
  window.CellFlagEnum = minesweeper.CellFlagEnum;
  window.Board = minesweeper.Board;
  window.Cell = minesweeper.Cell;
  window.generateMineArray = minesweeper.generateMineArray;

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

    $('.ms-state').empty();
    $('.ms-state').append('<span>' + board.state() + '</span>');
  };

  var printRow = function (rowArray, isWonLost, rowNum) {
    var i, cell, div, rowClass = '.ms-grid-row-' + rowNum;

    $('.ms-grid').append('<div class="ms-grid-row ' + rowClass.substr(1) + ' group"></div>');

    for (i=0; i<rowArray.length; i++) {
      cell = rowArray[i];
      div = createCellDiv(cell);
      $(rowClass).append(div);
      div.mousedown(onclickCell);
    }
  };

  var createCellDiv = function (cell) {
    var content = '', cssClass = 'ms-grid-cell ';
    var isOpen = cell.state === CellStateEnum.OPEN;

    if (isOpen == false) {
      cssClass += 'ms-x-grid-cell-closed';
      if (cell.flag === CellFlagEnum.NONE) {
        content = ' ';
      } else if (cell.flag === CellFlagEnum.EXCLAMATION) {
        content = '!';
      } else if (cell.flag === CellFlagEnum.QUESTION) {
        content = '?';
      }
    } else if (isOpen == true) {
      cssClass += 'ms-x-grid-cell-open';
      if (cell.isMine) {
        content = '*';
      } else {
        content = cell.numAdjacentMines || ' ';
      }
    }

    if (isOpen && cell.isMine) {
      cssClass += ' ms-x-grid-cell-mine';
    } else if (isOpen && cell.numAdjacentMines > 0) {
      cssClass += ' ms-x-grid-cell-abovezero';
    } else if (isOpen) {
      cssClass += ' ms-x-grid-cell-zero';
    }

    return $('<div class="' + cssClass + '" data-xy="' + cell.x + ','+ cell.y + '"> ' + content + '</div>');
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

  var onclickNewGame = function () {
    var rows = $('.ms-options-rows').val() || 10;
    var cols = $('.ms-options-cols').val() || 10;
    var mines = $('.ms-options-mines').val() || 15;
    var mineArray = generateMineArray({
      rows: +rows,
      cols: +cols,
      mines: +mines
    });

    // clean up any cells from existing board
    $('.ms-grid-cell').off('mousedown');

    board = new Board(mineArray);
    printBoard();
  };
  
  $('.ms-options-new').click(onclickNewGame);

  // let's get this party started
  onclickNewGame();
}());