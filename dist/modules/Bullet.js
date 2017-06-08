'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SliderPaginator = require('./SliderPaginator');

var _SliderPaginator2 = _interopRequireDefault(_SliderPaginator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Bullet
 *  
 * @param {any} props 
 * @returns 
 */
var Bullet = function Bullet(_ref) {
  var index = _ref.index,
      children = _ref.children,
      defaultStyle = _ref.defaultStyle,
      active = _ref.active,
      onClick = _ref.onClick;


  var handleClick = function handleClick(event) {
    event.preventDefault();
    onClick(index, true);
  };

  var classes = (0, _classnames2.default)('viewport-slider-paginator-bullet', { 'is-active': active });

  return _react2.default.createElement(
    'a',
    _extends({ href: '#',
      className: classes,
      onClick: handleClick

    }, defaultStyle ? { style: _SliderPaginator2.default.bulletDefaultStyle } : {}),
    children
  );
};

Bullet.defaultProps = {
  defaultStyle: true
};

Bullet.propTypes = {
  /** Flag to set bullet active */
  active: _propTypes2.default.bool,
  /** Index to item panel */
  index: _propTypes2.default.number.isRequired,
  /** Click handler */
  onClick: _propTypes2.default.func,
  /** Element to set as children */
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
  /** Flag to indicate default style should be used */
  defaultStyle: _propTypes2.default.bool
};

exports.default = Bullet;