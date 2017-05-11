'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _scrollToY = require('scroll-to-y');

var _scrollToY2 = _interopRequireDefault(_scrollToY);

var _SliderItem = require('./SliderItem');

var _SliderItem2 = _interopRequireDefault(_SliderItem);

var _Paginator = require('./Paginator');

var _Paginator2 = _interopRequireDefault(_Paginator);

var _SliderButton = require('./SliderButton');

var _SliderButton2 = _interopRequireDefault(_SliderButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slider = function (_Component) {
  _inherits(Slider, _Component);

  function Slider(props) {
    _classCallCheck(this, Slider);

    // set the default item to activate based on isActive prop of SliderItem's
    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

    var activeIndex = _this.props.children.filter(function (child) {
      return child.type === _SliderItem2.default;
    }).reduce(function (value, child, index) {
      return child.props.isActive && value === -1 ? index : value;
    }, -1);

    _this.state = {
      activeIndex: activeIndex === -1 ? 0 : activeIndex,
      countSliderItems: _this.props.children.filter(function (child) {
        return child.type === _SliderItem2.default;
      }).length
    };

    _this.setActive = _this.setActive.bind(_this);
    _this.handleScroll = _this.handleScroll.bind(_this);
    _this.scrollToPanel = _this.scrollToPanel.bind(_this);
    _this.lastScroll = 0;

    window.addEventListener('scroll', _this.handleScroll);

    return _this;
  }

  _createClass(Slider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // scroll to the active item
      setTimeout(function () {

        _this2.isMounting = true;
        _this2.scrollToPanel(_this2.state.activeIndex);
      }, 250);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }, {
    key: 'scrollToPanel',
    value: function scrollToPanel(index, callback) {
      var _this3 = this;

      this.isAnimating = true;
      (0, _scrollToY2.default)(this.refs['slide-' + index].offsetTop, 1000, 'easeInOutQuint', function () {
        _this3.isAnimating = false;
      });
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      if (this.isAnimating) {
        return;
      }

      if (this.isMounting === false) {
        // on mounting dont change activeIndex
        // up
        if (window.scrollY > this.lastScroll && window.innerHeight + window.scrollY > window.innerHeight * (this.state.activeIndex + 1) + window.innerHeight / 2) {
          this.setActive(this.state.activeIndex + 1);
          // down
        } else if (window.scrollY < this.lastScroll && window.innerHeight + window.scrollY < window.innerHeight * (this.state.activeIndex + 1) - window.innerHeight / 1.5) {
          this.setActive(this.state.activeIndex - 1);
        }
      }

      this.lastScroll = window.scrollY;
      this.isMounting = false;
    }
  }, {
    key: 'setActive',
    value: function setActive(index, scrollTo) {
      var _this4 = this;

      this.setState({ activeIndex: index }, function () {
        if (scrollTo) {
          _this4.scrollToPanel(index);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var countSliderItems = this.state.countSliderItems;

      var indexSliderItem = 0;

      // build children items
      var buildChildrenToRender = function buildChildrenToRender(child, index) {
        if (child.type === _SliderItem2.default) {
          var propsClone = Object.create(child.props || {});
          delete propsClone.children;

          var ref = 'slide-' + indexSliderItem;

          indexSliderItem += 1;

          // customize next button
          var nextButton = child.props.nextButton.type === _SliderButton2.default ? child.props.nextButton : _react2.default.cloneElement(_SliderItem2.default.defaultProps.nextButton, null, child.props.nextButton);

          nextButton = _react2.default.cloneElement(nextButton, {
            index: indexSliderItem - 1,
            onClick: _this5.setActive
          }, nextButton.props.children);
          //

          return _react2.default.createElement(
            'div',
            _extends({
              ref: ref
            }, propsClone, {
              className: (0, _classnames2.default)(_SliderItem2.default.defaultProps.className, child.props.className),
              style: Object.assign({}, _SliderItem2.default.defaultProps.style, child.props.style)
            }),
            child.props.children,
            indexSliderItem < countSliderItems && nextButton
          );
        } else {
          // any other child is rendered as is
          return child;
        }
      };

      var childrenToRender = _react2.default.Children.map(this.props.children, buildChildrenToRender);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Paginator2.default, {
          activeIndex: this.state.activeIndex,
          bullets: countSliderItems,
          onClick: this.setActive
        }),
        childrenToRender
      );
    }
  }]);

  return Slider;
}(_react.Component);

Slider.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]).isRequired
};

exports.default = Slider;