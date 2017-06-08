import PropTypes from 'prop-types';

PropTypes.equalTo = (component) => {
  return (propValue, key, componentName, location, propFullName) => {
    return propValue[key].type === component ?
      undefined
      :
      new Error('Invalid prop `' + propFullName + '` supplied to' + ' `' + componentName + '`. Validation failed.');
  };
};

export default PropTypes;
