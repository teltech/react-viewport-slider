import React, { Component } from 'react';
import PropTypes from 'prop-types';

const SliderPaginatorItem = () => {
  // nothing to render
  // the real thing is made in the Slider
  // SliderPaginatorItem is just an abstraction for the user 
  // just need this to be part of the component API 
  return null;
};

SliderPaginatorItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default SliderPaginatorItem;
