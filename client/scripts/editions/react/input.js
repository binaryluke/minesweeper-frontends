'use script';

var React = require('react');

module.exports = React.createClass({
  handleChange: function () {
    var value = this.refs.input.value;
    var name = this.props.name;
    this.props.notifyChange(name, value);
  },

  render: function () {
    return (
      <div style={{display: 'inline-block', width: '33.3%'}}>
        <div className="input-group">
          <span className="input-group-addon">{this.props.text}</span>
          <input type="number"
                 className="form-control"
                 ref="input"
                 onChange={this.handleChange}
                 name={this.props.name} 
                 min={this.props.min}
                 max={this.props.max}
                 step={this.props.step}
                 readOnly={this.props.readonly}
                 value={this.props.value} />
        </div>
      </div>
    );
  }
});