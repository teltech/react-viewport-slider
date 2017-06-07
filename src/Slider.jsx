'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import scrollToY from 'scroll-to-y';

import SliderItem from './SliderItem';
import Paginator from './Paginator';
import SliderButton from './SliderButton';
import SliderPaginator from './SliderPaginator';
import SliderPaginatorItem from './SliderPaginatorItem';


/**
 * constructSlider
 * scope: private 
 * 
 * Used to dynamicly build the slider
 * 
 */
function constructSlider() {
  const { countSliderItems } = this.state;
  let indexSliderItem = 0;    

  // set default paginator props
  this.paginatorProps = {
    onClick: this.setActive
  };
  this.showPaginator = true;

  // build children items
  // Will be called on each Slider child
  const buildChildrenToRender = (child, index) => {
    
    // check for SliderItem
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
    
    }
    // check for SliderPaginator 
    else if (child.type === SliderPaginator) {
      this.showPaginator = false;

      if (!child.props.defaultStyle || countSliderItems>1) {
        this.showPaginator = true;

        let bullets = React.Children
          .map(child.props.children, (childPaginator)=>{
            if (childPaginator.type === SliderPaginatorItem) {
              return childPaginator.props.children;
            } else {
              return null;
            }
          });
        
        let forceDafaultLayout = false;
        if (bullets && bullets.length !== countSliderItems) {
          forceDafaultLayout = true;
          if (console && console.warn) { 
            console.warn(`Number of 'SliderPaginatorItem' elements diffs from number of 'SliderItem'\nDefault layout will be applied`);
          }
          bullets = undefined;
        }

        if(!bullets) {
          bullets = Array.apply(null, {length: countSliderItems});          
        }
        
        this.paginatorProps = {
          className: child.props.className,
          style: Object.assign({}, child.props.style),                  
          onClick: this.setActive,
          defaultStyle: forceDafaultLayout || child.props.defaultStyle,
          bullets: bullets
        }
      }
    } else {
      // any other child is rendered as is
      return (child);
    }
  }

  return buildChildrenToRender.bind(this);
}

class Slider extends Component {

  constructor(props) {
    super(props);
    
    // set the default item to activate based on isActive prop of SliderItem's
    const activeIndex = !this.props.children? 0 : this.props.children
      .filter(child => child.type === SliderItem)
      .reduce(function(value, child, index) {
        return child.props.isActive && value === -1 ? index : value;
      }, -1);
    
    // set initial state
    this.state = { 
      activeIndex: activeIndex === -1 ? 0 : activeIndex,
      countSliderItems: !this.props.children? 0 : this.props.children.filter(child => child.type === SliderItem).length
    };

    if (this.state.countSliderItems === 0) {
      if (console && console.warn) { 
        console.warn(`No 'SliderItem' on children of 'Slider'`);
      }
    }

    this.setActive = this.setActive.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollToPanel = this.scrollToPanel.bind(this);
    this.lastScroll = 0;

    // set scroll event listener 
    window.addEventListener('scroll', this.handleScroll);

    // build children
    this.childrenToRender = React.Children
      .map(this.props.children, constructSlider.call(this));

    // no paginator declared use default
    if (!this.paginatorProps.bullets) {
      this.paginatorProps.bullets = Array.apply(null, {length: this.state.countSliderItems});
    }

  }
  componentDidMount() {
    // scroll to the active item
    setTimeout(()=> {      
      this.isMounting = true;
      this.scrollToPanel(this.state.activeIndex );      
    }, 100);
  }
  componentWillUnmount() {
    // remove scroll event listener
    window.removeEventListener('scroll', this.handleScroll);
  }
  scrollToPanel(index, callback) {    
    this.isAnimating = true;
    scrollToY(
      this.refs[`slide-${ index }`].offsetTop,
      this.props.animateSpeed,
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
    const {className, style} = this.props;
    
    return (
      <div 
        className={classNames(Slider.defaultProps.className, className)}
        style={style}
      >
        {this.showPaginator && <Paginator
          {...this.paginatorProps}
          activeIndex = {this.state.activeIndex}
        />}            
        {this.childrenToRender}
      </div>
    );
  }

}

Slider.defaultProps = {
  className: 'viewport-slider',
  animateSpeed: 1000
}

Slider.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  animateSpeed: PropTypes.number
};


export default Slider;

