import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * SliderPaginatorItem
 *   
 * @returns 
 */
const SliderPaginatorItem = () => {
  // nothing to render, the real thing is made in the Slider
  // SliderPaginatorItem is just a semantic abstraction for the user 
  return null;
};

SliderPaginatorItem.propTypes = {
  /** Elements to render as children */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default SliderPaginatorItem;
