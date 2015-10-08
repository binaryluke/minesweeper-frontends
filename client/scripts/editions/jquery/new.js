'use strict';

var $ = require('jquery');
var template = require('../../../templates/editions/jquery/new.html');

var MIN_ROWS = 10;
var MAX_ROWS = 30;
var MIN_COLS = 10;
var MAX_COLS = 30;

var onNewGameHandlers = [];

var render = function (container, width) {
  var div = $(container);

  if (div.html() === '') {
    renderTemplate(container);
  }

  div.css('width', width);
};

var renderTemplate = function (container) {
  var div = $(container);

  // are we already set up?
  if (div.html()) return;

  // render the template
  div.html(template);

  // attach event handlers
  div.find('.ms-new-new button').click(onclickNewGame);
  div.find('.dropdown li').click(onclickDifficultyItem);

  // default to easy difficulty selection
  $('.ms-new .dropdown [data-difficulty="easy"]').click();
};

var getNewGameParams = function (container) {
  var div = $(container);

  var rows = div.find('.ms-new-rows').val() || 10;
  var cols = div.find('.ms-new-cols').val() || 10;
  var mines = div.find('.ms-new-mines').val() || 15;

  return {
    rows: +rows,
    cols: +cols,
    mines: +mines
  };
};

var setNewGameParams = function (container, options) {
  var div = $(container);

  if (options.rows) {
    div.find('.ms-new-rows').val(+options.rows);
  }

  if (options.cols) {
    div.find('.ms-new-cols').val(+options.cols);
  }
  
  if (options.mines) {
    div.find('.ms-new-mines').val(+options.mines);
  }
};

var updateDifficulty = function (container, difficulty) {
  var params,
      rows,
      cols,
      mines,
      div = $(container),
      isPreset = true;
  
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
  } else {
    isPreset = false;
  }
  
  params = {
    rows: rows,
    cols: cols,
    mines: mines
  };

  setNewGameParams(container, params);

  if (isPreset) {
    div.find('.ms-new-custom-fields input').attr('readonly', true);
  } else {
    div.find('.ms-new-custom-fields input').removeAttr('readonly');
  }

  updateOptionErrorsDisplay(container);
};

var getOptionErrors = function (container) {
  var params = getNewGameParams(container), errors = [];

  if (params.rows < MIN_ROWS || params.cols < MIN_COLS) {
    errors.push('cells-toofew');
  }

  if (params.rows > MAX_ROWS || params.cols > MAX_COLS) {
    errors.push('cells-toomany');
  }

  if (params.rows <= 0 || params.cols <= 0) {
    errors.push('cells-zero');
  }

  if (params.mines > params.rows * params.cols) {
    errors.push('mines-toomany');
  }

  if (params.mines <= 0) {
    errors.push('mines-toofew');
  }

  if (!$.isNumeric(params.rows) || !$.isNumeric(params.cols) || !$.isNumeric(params.mines)) {
    errors.push('all-nonsense');
  }

  return errors;
};

var updateOptionErrorsDisplay = function (container) {
  var errors = getOptionErrors();
  var div = $(container).find('.ms-new-custom-warn');

  div.find('> div').hide();
  div.hide();

  if (errors.length) {
    $('.ms-new-custom .input-group').addClass('has-error');
    div.show();
  } else {
    $('.ms-new-custom .input-group').removeClass('has-error');
    div.hide();
  }

  $.each(errors, function (idx, error) {
    div.find('[data-errorname="' + error + '"]').show();
  });
};

var onclickNewGame = function () {
  var params,
      mineArray,
      errors,
      div = $(this).closest('.ms-new');

  params = getNewGameParams(div);
  errors = getOptionErrors(div);

  updateOptionErrorsDisplay(div, errors);
  if (errors.length) return;

  // call all new game event handlers
  callHandlers(div, onNewGameHandlers);
};

var onclickDifficultyItem = function () {
  var ele = $(this),
      text = ele.data('text'),
      difficulty = ele.data('difficulty'),
      container = ele.closest('.ms-new');

  container.find('.dropdown button').html(text + '<span class="caret"></span>');
  updateDifficulty(container, difficulty);
};

var addOnNewGameHandler = function (fn) {
  onNewGameHandlers.push(fn);
};

var callHandlers = function (container, handlers) {
  var idx;

  for (idx = 0; idx < handlers.length; idx++) {
    (handlers[idx])(getNewGameParams(container));
  }
};

module.exports = {
  render: render,
  addOnNewGameHandler: addOnNewGameHandler
};