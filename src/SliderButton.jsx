'use strict';

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const SliderButton = (props) => {
  return (
    <a href="#"/*{`#viewport-slide-${ props.index + 1 }`}*/
      className={classNames(SliderButton.defaultProps.className, props.className)}
      onClick={()=>props.onClick(props.index + 1, true)}
      style={Object.assign({}, SliderButton.defaultProps.style, props.style)}>
      {props.children}
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
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};

export default SliderButton;
