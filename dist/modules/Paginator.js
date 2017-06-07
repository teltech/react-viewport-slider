'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Bullet = require('./Bullet');

var _Bullet2 = _interopRequireDefault(_Bullet);

var _SliderPaginator = require('./SliderPaginator');

var _SliderPaginator2 = _interopRequireDefault(_SliderPaginator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Paginator = function Paginator(props) {
  // The internal and real paginator
  var className = props.className,
      style = props.style,
      defaultStyle = props.defaultStyle,
      activeIndex = props.activeIndex,
      onClick = props.onClick;


  return _react2.default.createElement(
    'div',
    _extends({
      className: (0, _classnames2.default)(_SliderPaginator2.default.defaultProps.className, defaultStyle ? '' : className)
    }, defaultStyle ? { style: _SliderPaginator2.default.defaultProps.style } : style ? { style: style } : {}),
    props.bullets.map(function (item, index) {
      return _react2.default.createElement(
        _Bullet2.default,
        {
          active: index === activeIndex,
          key: index,
          index: index,
          onClick: onClick,
          defaultStyle: item == null || defaultStyle
        },
        !defaultStyle && item
      );
    })
  );
};

Paginator.propTypes = {
  activeIndex: _propTypes2.default.number,
  bullets: _propTypes2.default.array.isRequired,
  onClick: _propTypes2.default.func,
  defaultStyle: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object
};

Paginator.defaultProps = {
  defaultStyle: true,
  bullets: []
};

exports.default = Paginator;