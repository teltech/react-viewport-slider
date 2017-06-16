'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

/**
 * Paginator
 * 
 * @param {any} props 
 * @returns 
 */
var Paginator = function Paginator(props) {
  var className = props.className,
      style = props.style,
      defaultStyle = props.defaultStyle,
      activeIndex = props.activeIndex,
      onClick = props.onClick,
      mergeStyle = props.mergeStyle;


  var newStyle = Object.assign({}, mergeStyle ? Object.assign({}, _SliderPaginator2.default.defaultStyle, style) : style);

  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(_SliderPaginator2.default.defaultProps.className, className.replace(_SliderPaginator2.default.defaultProps.className, '')),
      style: newStyle
    },
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

Paginator.defaultProps = {
  defaultStyle: true,
  mergeStyle: true,
  bullets: []
};

Paginator.propTypes = {
  /** Css class to apply to the element */
  className: _propTypes2.default.string,
  /** Style attribute object to apply to the element */
  style: _propTypes2.default.object,
  /** The active index panel */
  activeIndex: _propTypes2.default.number,
  /** Array with the bullets elements to display as paginator items */
  bullets: _propTypes2.default.array.isRequired,
  /** Click handler */
  onClick: _propTypes2.default.func,
  /** Flag to indicate that the default style will be applied */
  defaultStyle: _propTypes2.default.bool,
  /** Flag to indicate that the 'style' object passed in must be mergeed into the default */
  mergeStyle: _propTypes2.default.bool
};

exports.default = Paginator;