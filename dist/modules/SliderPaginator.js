'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SliderPaginator = function SliderPaginator() {
  // nothing to render
  // the real thing is made in the Slider
  // SliderPaginator is just an abstraction for the user 
  // just need this to be part of the component API 
  return null;
};

SliderPaginator.defaultProps = {
  defaultStyle: true,
  className: 'viewport-slider-paginator',
  style: {
    top: '50%',
    right: '50px',
    position: 'fixed',
    transform: 'translateY(-50%)',
    zIndex: 2
  }
};

SliderPaginator.propTypes = {
  defaultStyle: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node])
};

exports.default = SliderPaginator;