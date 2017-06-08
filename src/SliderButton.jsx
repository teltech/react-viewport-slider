'use strict';

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * SliderButton
 * 
 * @param {any} {className, onClick, style, children} 
 * @returns 
 */
const SliderButton = ({className, onClick, style, children, index}) => {
  return (
    <a href="#"
      className={classNames(SliderButton.defaultProps.className, className
        .replace(SliderButton.defaultProps.className,'')
      )}
      onClick={(event)=> {
        event.preventDefault();
        onClick(index + 1, true)
      }}
      style={Object.assign({}, SliderButton.defaultProps.style, style)}
    >
      {children}
    </a>
  );
};

SliderButton.defaultProps = {
  index: 0,
  className: 'viewport-slider-button',
  style: {
    bottom: '50px',
    left: '50%',
    position: 'absolute',
    transform: 'translateX(-50%)',
    zIndex: 2
  }
}

SliderButton.propTypes = {
  /** The panel index where the button appears */
  index: PropTypes.number.isRequired,
  /** Click handler */
  onClick: PropTypes.func,
  /** Css class to apply to he element */
  className: PropTypes.string,
  /** Style attribute object to apply to the element */
  style: PropTypes.object
};

export default SliderButton;
