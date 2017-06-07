'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';

import Bullet from './Bullet';
import SliderPaginator from './SliderPaginator';

const Paginator = (props) => {
  // The internal and real paginator
  const {className, style, defaultStyle, activeIndex, onClick} = props;
  
  return (
    <div 
      className={classNames(SliderPaginator.defaultProps.className, defaultStyle? '' : className)}
      {...defaultStyle ? {style: SliderPaginator.defaultProps.style} : style? {style} : {}}
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

Paginator.propTypes = {
  activeIndex: PropTypes.number,
  bullets: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  defaultStyle: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

Paginator.defaultProps = {
  defaultStyle: true,
  bullets: []
}

export default Paginator;
