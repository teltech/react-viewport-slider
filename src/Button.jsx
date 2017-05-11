'use strict';

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = (props) => {
  const style = {
    bottom: '50px',
    left: '50%',
    position: 'absolute',
    transform: 'translateX(-50%)',
    zIndex: 2
  }

  return (
    <a href="#"/*{`#viewport-slide-${ props.index + 1 }`}*/
      className="viewport-slider-button"
      onClick={()=>props.onClick(props.index + 1, true)}
      style={style}>
      {props.children}
    </a>
  );
};

Button.propTypes = {
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func
};

export default Button;
