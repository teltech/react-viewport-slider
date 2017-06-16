'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _proptypesUtil = require('./proptypes-util');

var _proptypesUtil2 = _interopRequireDefault(_proptypesUtil);

var _SliderPaginatorItem = require('./SliderPaginatorItem');

var _SliderPaginatorItem2 = _interopRequireDefault(_SliderPaginatorItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * SliderPaginator
 *
 * @returns
 */
var SliderPaginator = function SliderPaginator() {
  // nothing to render, the real thing is made in the Slider
  // SliderPaginator is just a semantic abstraction for the user
  return null;
};

/** Expose default 'style' for paginator */
SliderPaginator.defaultStyle = {
  top: '50%',
  right: '50px',
  position: 'fixed',
  transform: 'translateY(-50%)',
  zIndex: 2
};

SliderPaginator.bulletDefaultStyle = {
  display: 'block',
  height: '20px',
  width: '20px'
};

SliderPaginator.defaultProps = {
  className: 'viewport-slider-paginator',
  style: {},
  mergeStyle: true
};

SliderPaginator.propTypes = {
  /** Css class to apply to the element */
  className: _proptypesUtil2.default.string,
  /** Style attribute object to apply to the element */
  style: _proptypesUtil2.default.object,
  /** Flag to indicate that the 'style' is to be merged into the 'defaultStyle' */
  mergeStyle: _proptypesUtil2.default.bool,
  /** Array of element items to apply as paginator items
      Takes precendence to the SliderPaginatorItem passed in as children
  */
  items: _proptypesUtil2.default.arrayOf(_proptypesUtil2.default.node),
  /** Array of 'SliderPaginatorItem' elements */
  children: _proptypesUtil2.default.arrayOf(_proptypesUtil2.default.equalTo(_SliderPaginatorItem2.default))
};

exports.default = SliderPaginator;