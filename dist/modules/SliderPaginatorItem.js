'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * SliderPaginatorItem
 *   
 * @returns 
 */
var SliderPaginatorItem = function SliderPaginatorItem() {
  // nothing to render, the real thing is made in the Slider
  // SliderPaginatorItem is just a semantic abstraction for the user 
  return null;
};

SliderPaginatorItem.propTypes = {
  /** Elements to render as children */
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node])
};

exports.default = SliderPaginatorItem;