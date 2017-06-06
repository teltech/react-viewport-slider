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

var SliderItem = function SliderItem() {
  // nothing to render
  // the real thing is made in the Slider
  // SliderItem is just an abstraction for the user 
  // just need this to be part of the component API 
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
  )
};

SliderItem.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
  nextButton: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.node])
};

exports.default = SliderItem;