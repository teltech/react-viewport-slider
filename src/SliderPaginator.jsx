import React, { Component } from 'react';
import PropTypes from 'prop-types';

const SliderPaginator = () => {
  // nothing to render
  // the real thing is made in the Slider
  // SliderPaginator is just an abstraction for the user 
  // just need this to be part of the component API 
  return null;
};

SliderPaginator.defaultProps = {
  defaultStyle: true,
  className: 'viewport-slider-paginator',
  style: {
    top: '50%',
    right: '50px',
    position: 'fixed',
    transform: 'translateY(-50%)',
    zIndex: 2
  }
};

SliderPaginator.propTypes = {
  defaultStyle: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default SliderPaginator;
