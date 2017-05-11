'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import scrollToY from 'scroll-to-y';

import SliderItem from './SliderItem';
import Paginator from './Paginator';
import SliderButton from './SliderButton';

class Slider extends Component {

  constructor(props) {
    super(props);
    
    // set the default item to activate based on isActive prop of SliderItem's
    const activeIndex = this.props.children
      .filter(child => child.type === SliderItem)
      .reduce(function(value, child, index) {
        return child.props.isActive && value === -1 ? index : value;
      }, -1);
    
    
    this.state = { 
      activeIndex: activeIndex === -1 ? 0 : activeIndex,
      countSliderItems: this.props.children.filter(child => child.type === SliderItem).length
    };

    this.setActive = this.setActive.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollToPanel = this.scrollToPanel.bind(this);
    this.lastScroll = 0;

    window.addEventListener('scroll', this.handleScroll)
    
  }
  componentDidMount() {
    // scroll to the active item
    setTimeout(()=> {
      
      this.isMounting = true;
      this.scrollToPanel(this.state.activeIndex );      
    },250);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  scrollToPanel(index, callback) {    
    this.isAnimating = true;
    scrollToY(
      this.refs[`slide-${ index }`].offsetTop,
      1000,
      'easeInOutQuint',
      () => {
        this.isAnimating = false;        
      }
    );    
  }

  handleScroll() {
    if (this.isAnimating) {
      return;
    }
    
    if (this.isMounting === false) { // on mounting dont change activeIndex
      // up
      if (
        window.scrollY > this.lastScroll &&
        window.innerHeight + window.scrollY >
          ((window.innerHeight * (this.state.activeIndex+1)) + window.innerHeight/2)
      ) {
        this.setActive(this.state.activeIndex + 1);
      // down
      } else if (
        window.scrollY < this.lastScroll &&
        window.innerHeight + window.scrollY <
          ((window.innerHeight * (this.state.activeIndex +1)) - window.innerHeight/1.5)
      ) {
        this.setActive(this.state.activeIndex - 1);
      }
    }    

    this.lastScroll = window.scrollY;
    this.isMounting = false;
  }

  setActive(index, scrollTo) {
    this.setState({ activeIndex: index }, () => {
      if (scrollTo) { 
        this.scrollToPanel(index);
      }
    });
  }

  render() {
    const { countSliderItems } = this.state;
    let indexSliderItem = 0;
    
    // build children items
    const buildChildrenToRender = (child, index) => {
      if (child.type === SliderItem) {        
        const propsClone = Object.create(child.props || {});
        delete propsClone.children;
        
        const ref = `slide-${ indexSliderItem }`;        

        indexSliderItem+=1;
        
        // customize next button
        let nextButton = child.props.nextButton.type === SliderButton ?
            child.props.nextButton :
            React.cloneElement(SliderItem.defaultProps.nextButton, null, child.props.nextButton)
          
        nextButton = React.cloneElement(
          nextButton,
          {
            index: indexSliderItem-1,
            onClick: this.setActive
          }, 
          nextButton.props.children
        );
        //

        return (
          <div 
            ref={ref}
            {...propsClone}
            className={classNames(SliderItem.defaultProps.className, child.props.className)}
            style={Object.assign({}, SliderItem.defaultProps.style, child.props.style)}
          >
            {child.props.children}
            {(indexSliderItem < countSliderItems) && nextButton
            }
          </div>
        );
      } else {
        // any other child is rendered as is
        return (child);
      }
    }

    const childrenToRender = React.Children.map(this.props.children, buildChildrenToRender);

    return (
      <div>
        <Paginator
          activeIndex={this.state.activeIndex}
          bullets={countSliderItems}
          onClick={this.setActive}
        />
        {childrenToRender}
      </div>
    );
  }

}

Slider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};


export default Slider;
