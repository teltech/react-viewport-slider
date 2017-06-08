'use strict';

import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import SliderPaginator from './SliderPaginator';

/**
 * Bullet
 *  
 * @param {any} props 
 * @returns 
 */
const Bullet = ({index, children, defaultStyle, active, onClick}) => {
  
  const handleClick = (event) => {
    event.preventDefault();
    onClick(index, true);
  };

  const classes = classNames(
    'viewport-slider-paginator-bullet',
    { 'is-active': active }
  );

  return (
    <a href="#"
      className={classes}
      onClick={handleClick}
      
      {...defaultStyle ? {style:SliderPaginator.bulletDefaultStyle} : {}}
    >
      {children}
    </a>
  );

};

Bullet.defaultProps = {
  defaultStyle: true
}

Bullet.propTypes = {
  /** Flag to set bullet active */
  active: PropTypes.bool,
  /** Index to item panel */
  index: PropTypes.number.isRequired,
  /** Click handler */
  onClick: PropTypes.func,
  /** Element to set as children */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  /** Flag to indicate default style should be used */
  defaultStyle: PropTypes.bool
};

export default Bullet;
