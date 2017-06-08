import React, { Component } from 'react';
import PropTypes from './proptypes-util';

import SliderPaginatorItem from './SliderPaginatorItem';

/**
 * SliderPaginator
 * 
 * @returns 
 */
const SliderPaginator = () => {
  // nothing to render, the real thing is made in the Slider
  // SliderPaginator is just a semantic abstraction for the user 
  return null;
};

/** Expose default 'style' for paginator */
SliderPaginator.defaultStyle = {
  top: '50%',
  right: '50px',
  position: 'fixed',
  transform: 'translateY(-50%)',
  zIndex: 2
};

SliderPaginator.bulletDefaultStyle = {
  display: 'block',
  height: '20px',
  width: '20px'
};

SliderPaginator.defaultProps = {
  className: 'viewport-slider-paginator',  
  style: {},
  mergeStyle: true
};

SliderPaginator.propTypes = {
  /** Css class to apply to the element */
  className: PropTypes.string,
  /** Style attribute object to apply to the element */
  style: PropTypes.object,
  /** Flag to indicate that the 'style' is to be merged into the 'defaultStyle' */
  mergeStyle: PropTypes.bool,  
  /** Array of element items to apply as paginator items 
      Takes precendence to the SliderPaginatorItem passed in as children
  */
  items: PropTypes.arrayOf(PropTypes.node),
  /** Array of 'SliderPaginatorItem' elements */
  children: PropTypes.arrayOf(PropTypes.equalTo(SliderPaginatorItem))
};

export default SliderPaginator;
