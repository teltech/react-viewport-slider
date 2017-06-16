import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SliderButton from './SliderButton';

/**
 * SliderItem component
 * 
 * @returns 
 */
const SliderItem = () => {
  // nothing to render, the real thing is made in the Slider
  // SliderItem is just a semantic abstraction for the user 
  return null;
};

SliderItem.defaultProps = {
  style: {
    boxSizing: 'border-box',
    position: 'relative',
    width: '100%',
    backgroundColor: '#CDCDCD'
  },
  className: 'viewport-slider-item',
  nextButton: <SliderButton>next</SliderButton>,
  isActive: false
};

SliderItem.propTypes = {
  /** Css class to apply to the element */
  className: PropTypes.string,
  /** Style attribute object to apply to the element */
  style: PropTypes.object,
  /** Elements to render as children */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  /** Sets the item as the active panel */
  isActive: PropTypes.bool,
  /** An element to render as the 'next' button */
  nextButton: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node
  ])
};

export default SliderItem;
