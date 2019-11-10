const React = require('react');
const FontAwesomeIcon = require('@fortawesome/react-fontawesome').FontAwesomeIcon;
const icons = require('@fortawesome/free-brands-svg-icons');

module.exports = React.createClass({
  render: function () {
    return (
      <footer className="group">
        <div className="author-details">
          <span><a target="_blank" href="https://lukehoward.name/">Luke Howard</a></span>
        </div>
        <div className="author-social">
          <a target="_blank" href="https://twitter.com/binaryluke"><FontAwesomeIcon icon={icons.faTwitter} /></a>&nbsp;
          <a target="_blank" href="https://au.linkedin.com/in/lukehoward"><FontAwesomeIcon icon={icons.faLinkedinIn} /></a>&nbsp;
          <a target="_blank" href="https://github.com/binaryluke"><FontAwesomeIcon icon={icons.faGithubAlt} /></a>
        </div>
      </footer>
    );
  },
});
