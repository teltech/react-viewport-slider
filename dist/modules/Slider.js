'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _scrollToY = require('scroll-to-y');

var _scrollToY2 = _interopRequireDefault(_scrollToY);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _SliderItem = require('./SliderItem');

var _SliderItem2 = _interopRequireDefault(_SliderItem);

var _Paginator = require('./Paginator');

var _Paginator2 = _interopRequireDefault(_Paginator);

var _SliderButton = require('./SliderButton');

var _SliderButton2 = _interopRequireDefault(_SliderButton);

var _SliderPaginator = require('./SliderPaginator');

var _SliderPaginator2 = _interopRequireDefault(_SliderPaginator);

var _SliderPaginatorItem = require('./SliderPaginatorItem');

var _SliderPaginatorItem2 = _interopRequireDefault(_SliderPaginatorItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * buildChildrenToRender
 * 
 * Dynamicly builds the slider with its items
 * Scope: private
 * 
 * The function returned will be called on each child of Slider
 * @returns function
 */
function buildChildrenToRender() {
  var _this = this;

  var countSliderItems = this.state.countSliderItems;

  var indexSliderItem = 0;

  // set default paginator props
  this.paginatorProps = {
    onClick: this.setActive
  };
  this.showPaginator = true;

  // build children items
  // Will be called on each Slider child
  var iterateChild = function iterateChild(child, index) {

    // check for SliderItem
    if (child.type === _SliderItem2.default) {
      var propsClone = _lodash2.default.cloneDeep(child.props || {});
      delete propsClone.children;
      delete propsClone.isActive;
      delete propsClone.nextButton;

      indexSliderItem += 1;

      // customize next button
      var nextButton = child.props.nextButton.type === _SliderButton2.default ? child.props.nextButton : _react2.default.cloneElement(_SliderItem2.default.defaultProps.nextButton, null, child.props.nextButton);

      nextButton = _react2.default.cloneElement(nextButton, {
        index: indexSliderItem - 1,
        onClick: _this.setActive
      }, nextButton.props.children);

      return _react2.default.createElement(
        'div',
        _extends({
          ref: function ref(el) {
            return _this.domRefs.push(el);
          }
        }, propsClone, {
          className: (0, _classnames2.default)(_SliderItem2.default.defaultProps.className, child.props.className.replace(_SliderItem2.default.defaultProps.className, '')),
          style: Object.assign({}, _SliderItem2.default.defaultProps.style, child.props.style)
        }),
        child.props.children,
        indexSliderItem < countSliderItems && nextButton
      );
    }
    // check for SliderPaginator 
    else if (child.type === _SliderPaginator2.default) {

        _this.showPaginator = false;

        var bullets = child.props.items || _react2.default.Children.map(child.props.children, function (childPaginator) {
          if (childPaginator.type === _SliderPaginatorItem2.default) {
            return childPaginator.props.children;
          } else {
            return null;
          }
        });

        if (bullets || countSliderItems > 1) {
          _this.showPaginator = true;

          var isDefaultStyle = false;

          if (bullets && bullets.length !== countSliderItems) {
            isDefaultStyle = true;
            if (console && console.warn) {
              console.warn('Number of \'SliderPaginatorItem\' elements diffs from number of \'SliderItem\'\nDefault layout will be applied');
            }
            bullets = undefined;
          }

          isDefaultStyle = isDefaultStyle || !bullets;

          if (!bullets) {
            bullets = Array.apply(null, { length: countSliderItems });
          }

          var restProps = _lodash2.default.cloneDeep(child.props || {});
          delete restProps.children;

          _this.paginatorProps = Object.assign({}, restProps, {
            onClick: _this.setActive,
            defaultStyle: isDefaultStyle,
            bullets: bullets
          });
        }
      } else {
        // any other child is rendered as is
        return child;
      }
  };
  return iterateChild.bind(this);
}

/**
 * Slider Component
 * 
 * @class Slider
 * @extends {Component}
 */

var Slider = function (_Component) {
  _inherits(Slider, _Component);

  /**
   * Creates an instance of Slider.
   * @param {any} props 
   * 
   * @memberof Slider
   */
  function Slider(props) {
    _classCallCheck(this, Slider);

    // set the default item to activate based on isActive prop of SliderItem's
    var _this2 = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

    var activeIndex = !_this2.props.children ? 0 : _this2.props.children.filter(function (child) {
      return child.type === _SliderItem2.default;
    }).reduce(function (value, child, index) {
      return child.props.isActive && value === -1 ? index : value;
    }, -1);

    // set initial state
    _this2.state = {
      activeIndex: activeIndex === -1 ? 0 : activeIndex,
      countSliderItems: !_this2.props.children ? 0 : _this2.props.children.filter(function (child) {
        return child.type === _SliderItem2.default;
      }).length
    };

    // set the scroll percent
    _this2.scrollPercent = typeof props.scrollPercent === 'number' ? { up: props.scrollPercent, down: props.scrollPercent } : Object.assign({}, props.scrollPercent);

    if (_this2.state.countSliderItems === 0) {
      if (console && console.warn) {
        console.warn('No \'SliderItem\' on children of \'Slider\'');
      }
    }

    _this2.setActive = _this2.setActive.bind(_this2);
    _this2.handleScroll = _this2.handleScroll.bind(_this2);
    _this2.scrollToPanel = _this2.scrollToPanel.bind(_this2);

    // set scroll event listener 
    window.addEventListener('scroll', _this2.handleScroll);

    // build children
    _this2.domRefs = [];

    _this2.childrenToRender = _react2.default.Children.map(_this2.props.children, buildChildrenToRender.call(_this2));

    // no paginator declared use default
    if (!_this2.paginatorProps.bullets) {
      _this2.paginatorProps.bullets = Array.apply(null, { length: _this2.state.countSliderItems });
    }

    return _this2;
  }

  _createClass(Slider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      // scroll to the active item
      setTimeout(function () {
        _this3.isMounting = true;
        _this3.scrollToPanel(_this3.state.activeIndex);
      }, 100);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // remove scroll event listener
      window.removeEventListener('scroll', this.handleScroll);
    }
    /**
     * Scrolls to desired panel
     * 
     * @param {any} index 
     * @param {any} callback 
     * 
     * @memberof Slider
     */

  }, {
    key: 'scrollToPanel',
    value: function scrollToPanel(index, callback) {
      var _this4 = this;

      this.isAnimating = true;
      (0, _scrollToY2.default)(this.domRefs[index].offsetTop, this.props.animateSpeed, 'easeInOutQuint', function () {
        _this4.isAnimating = false;
      });
    }
    /**
     * Window scroll listener
     * 
     * @returns 
     * 
     * @memberof Slider
     */

  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      if (this.isAnimating) {
        return;
      }

      /**
       * Get sum off offsetHeight for all slider items previous to an index item
       * decrement a specific amount of the last slider 
       * @param {number} [value=0.5|[0.1,0.9]] - the amount in percentage of the slider index offsetHeight to be left to scroll
       * when setting a different slider active 
       * Ex: 0.5 - means that we will set the next slider after scroll 50% of the active index
       */
      function _getSumOffset(items, index, value) {
        return items.slice(0, index + 1).reduce(function (acc, item) {
          return acc + item.offsetHeight;
        }, 0) - items[index].offsetHeight * (value < 0.1 ? 0.1 : value > 0.9 ? 0.9 : value);
      }

      if (this.isMounting === false) {
        // on mounting dont change activeIndex
        var valueToUpIndex = _getSumOffset(this.domRefs, this.state.activeIndex, this.scrollPercent.down);
        var valueToDownIndex = this.state.activeIndex > 0 ? _getSumOffset(this.domRefs, this.state.activeIndex - 1, this.scrollPercent.up) : 0;

        // up state (scroll down)
        if (window.scrollY > valueToUpIndex) {
          this.setActive(this.state.activeIndex + 1);
          // down state (scroll up)
        } else if (window.scrollY < valueToDownIndex) {
          this.setActive(this.state.activeIndex - 1);
        }
      }

      this.isMounting = false;
    }
    /**
     * Updates the index for the active panel on state
     * Called from the Paginator component or from the scroll handler
     * 
     * @param {any} index 
     * @param {any} scrollTo 
     * 
     * @memberof Slider
     */

  }, {
    key: 'setActive',
    value: function setActive(index, scrollTo) {
      var _this5 = this;

      this.setState({ activeIndex: index }, function () {
        if (scrollTo) {
          _this5.scrollToPanel(index);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          style = _props.style;


      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(Slider.defaultProps.className, className.replace(Slider.defaultProps.className, '')),
          style: style
        },
        this.showPaginator && _react2.default.createElement(_Paginator2.default, _extends({}, this.paginatorProps, {
          activeIndex: this.state.activeIndex
        })),
        this.childrenToRender
      );
    }
  }]);

  return Slider;
}(_react.Component);

Slider.defaultProps = {
  className: 'viewport-slider',
  animateSpeed: 1000,
  scrollPercent: { up: 0.75, down: 0.25 }
};

Slider.propTypes = {
  /** Css class to apply to the element */
  className: _propTypes2.default.string,
  /** Style attribute object to apply to the element */
  style: _propTypes2.default.object,
  /** children */
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]).isRequired,
  /** sets the animation speed for the slider */
  animateSpeed: _propTypes2.default.number,
  /** sets the scroll amount relative to slider offsetHeight to activate next/previous slider */
  scrollPercent: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.shape({
    up: _propTypes2.default.number.isRequired,
    down: _propTypes2.default.number.isRequired
  })])
};

exports.default = Slider;