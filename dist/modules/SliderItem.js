'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SliderButton = require('./SliderButton');

var _SliderButton2 = _interopRequireDefault(_SliderButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * SliderItem component
 * 
 * @returns 
 */
var SliderItem = function SliderItem() {
  // nothing to render, the real thing is made in the Slider
  // SliderItem is just a semantic abstraction for the user 
  return null;
};

SliderItem.defaultProps = {
  style: {
    boxSizing: 'border-box',
    position: 'relative',
    width: '100%',
    backgroundColor: '#CDCDCD'
  },
  className: 'viewport-slider-item',
  nextButton: _react2.default.createElement(
    _SliderButton2.default,
    null,
    'next'
  ),
  isActive: false
};

SliderItem.propTypes = {
  /** Css class to apply to the element */
  className: _propTypes2.default.string,
  /** Style attribute object to apply to the element */
  style: _propTypes2.default.object,
  /** Elements to render as children */
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
  /** Sets the item as the active panel */
  isActive: _propTypes2.default.bool,
  /** An element to render as the 'next' button */
  nextButton: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.node])
};

exports.default = SliderItem;