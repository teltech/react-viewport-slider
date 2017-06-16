'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * SliderButton
 * 
 * @param {any} {className, onClick, style, children} 
 * @returns 
 */
var SliderButton = function SliderButton(_ref) {
  var className = _ref.className,
      _onClick = _ref.onClick,
      style = _ref.style,
      children = _ref.children,
      index = _ref.index;

  return _react2.default.createElement(
    'a',
    { href: '#',
      className: (0, _classnames2.default)(SliderButton.defaultProps.className, className.replace(SliderButton.defaultProps.className, '')),
      onClick: function onClick(event) {
        event.preventDefault();
        _onClick(index + 1, true);
      },
      style: Object.assign({}, SliderButton.defaultProps.style, style)
    },
    children
  );
};

SliderButton.defaultProps = {
  index: 0,
  className: 'viewport-slider-button',
  style: {
    bottom: '50px',
    left: '50%',
    position: 'absolute',
    transform: 'translateX(-50%)',
    zIndex: 2
  }
};

SliderButton.propTypes = {
  /** The panel index where the button appears */
  index: _propTypes2.default.number.isRequired,
  /** Click handler */
  onClick: _propTypes2.default.func,
  /** Css class to apply to he element */
  className: _propTypes2.default.string,
  /** Style attribute object to apply to the element */
  style: _propTypes2.default.object
};

exports.default = SliderButton;