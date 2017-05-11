import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SliderButton from './SliderButton';

const SliderItem = () => {
  // nothing to render
  // the real thing is made in the Slider
  // SliderItem is just an abstraction for the user 
  // just need this to be part of the component API 
  return null;
};

SliderItem.defaultProps = {
  style: {
    boxSizing: 'border-box',
    height: '100vh',
    position: 'relative',
    width: '100%',
    backgroundColor: '#CDCDCD'
  },
  className: 'viewport-slider-item',
  nextButton: <SliderButton>next</SliderButton>
};

SliderItem.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  nextButton: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node
  ])
};

export default SliderItem;
