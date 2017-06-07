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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bullet = function Bullet(props) {
  // bullet for paginator
  var children = props.children,
      defaultStyle = props.defaultStyle;


  var style = {
    display: 'block',
    height: '20px',
    width: '20px'
  };

  var handleClick = function handleClick(event) {
    event.preventDefault();
    props.onClick(props.index, true);
  };

  var classes = (0, _classnames2.default)('viewport-slider-paginator-bullet', { 'is-active': props.active });

  return _react2.default.createElement(
    'a',
    _extends({ href: '#',
      className: classes,
      onClick: handleClick

    }, defaultStyle ? { style: style } : {}),
    children
  );
};

Bullet.propTypes = {
  active: _propTypes2.default.bool,
  index: _propTypes2.default.number.isRequired,
  onClick: _propTypes2.default.func,
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
  defaultStyle: _propTypes2.default.bool
};

Bullet.defaultProps = {
  defaultStyle: true
};

exports.default = Bullet;