'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_propTypes2.default.equalTo = function (component) {
  return function (propValue, key, componentName, location, propFullName) {
    return propValue[key].type === component ? undefined : new Error('Invalid prop `' + propFullName + '` supplied to' + ' `' + componentName + '`. Validation failed.');
  };
};

exports.default = _propTypes2.default;