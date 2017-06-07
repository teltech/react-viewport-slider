'use strict';

import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const Bullet = (props) => {
  // bullet for paginator
  const {children, defaultStyle} = props;

  const style = {
    display: 'block',
    height: '20px',
    width: '20px'
  }

  const handleClick = (event) => {
    event.preventDefault();
    props.onClick(props.index, true);
  };

  const classes = classNames(
    'viewport-slider-paginator-bullet',
    { 'is-active': props.active }
  )

  return (
    <a href="#"
      className={classes}
      onClick={handleClick}
      
      {...defaultStyle ? {style} : {}}
    >
      {children}
    </a>
  );

};

Bullet.propTypes = {
  active: PropTypes.bool,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  defaultStyle: PropTypes.bool
};

Bullet.defaultProps = {
  defaultStyle: true
}

export default Bullet;
