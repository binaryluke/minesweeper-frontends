'use strict';

var React = require('react');

module.exports = React.createClass({
  handleClick: function (e) {
    var difficulty = e.target.textContent.toLowerCase();
    this.props.changeDifficulty(difficulty);
  },

  render: function () {
    var capitalize = function (text) {
      var a = text.substr(0, 1);
      var b = text.substr(1);
      return a.toUpperCase() + b;
    };

    return (
      <div className="dropdown">
        <button className="btn btn-default dropdown-toggle" type="button" id="difficultyDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          {capitalize(this.props.difficulty)}
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="difficultyDropdown">
          <li onClick={this.handleClick}>Easy</li>
          <li onClick={this.handleClick}>Medium</li>
          <li onClick={this.handleClick}>Hard</li>
          <li role="separator" className="divider"></li>
          <li onClick={this.handleClick}>Custom</li>
        </ul>
      </div>
    );
  }
});