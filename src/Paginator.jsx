'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';

import Bullet from './Bullet';
import SliderPaginator from './SliderPaginator';

/**
 * Paginator
 * 
 * @param {any} props 
 * @returns 
 */
const Paginator = (props) => {
  
  const {
    className,
    style,
    defaultStyle,
    activeIndex,
    onClick,
    mergeStyle
  } = props;
  
  const newStyle = Object.assign({},
    mergeStyle?
      Object.assign({}, SliderPaginator.defaultStyle, style)
      :
      style
  );
  
  return (
    <div 
      className={classNames(SliderPaginator.defaultProps.className, className
        .replace(SliderPaginator.defaultProps.className,''))}
      style={newStyle}
    >
      {props.bullets.map((item, index) => {
        return (
          <Bullet 
            active={index === activeIndex}
            key={index}
            index={index}
            onClick={onClick}
            defaultStyle={item == null || defaultStyle}
          >
            {!defaultStyle && item}
          </Bullet>
        );
      })}
    </div>
  );
};

Paginator.defaultProps = {
  defaultStyle: true,
  mergeStyle: true,
  bullets: []
}

Paginator.propTypes = {
  /** Css class to apply to the element */
  className: PropTypes.string,
  /** Style attribute object to apply to the element */
  style: PropTypes.object,
  /** The active index panel */
  activeIndex: PropTypes.number,
  /** Array with the bullets elements to display as paginator items */
  bullets: PropTypes.array.isRequired,
  /** Click handler */
  onClick: PropTypes.func,
  /** Flag to indicate that the default style will be applied */
  defaultStyle: PropTypes.bool,
  /** Flag to indicate that the 'style' object passed in must be mergeed into the default */
  mergeStyle: PropTypes.bool
};

export default Paginator;
