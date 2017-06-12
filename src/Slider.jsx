'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import scrollToY from 'scroll-to-y';
import _ from 'lodash';
import SliderItem from './SliderItem';
import Paginator from './Paginator';
import SliderButton from './SliderButton';
import SliderPaginator from './SliderPaginator';
import SliderPaginatorItem from './SliderPaginatorItem';


/**
 * buildChildrenToRender
 * 
 * Dynamicly builds the slider with its items
 * Scope: private
 * 
 * The function returned will be called on each child of Slider
 * @returns function
 */
function buildChildrenToRender() {
  const { countSliderItems } = this.state;
  let indexSliderItem = 0;    

  // set default paginator props
  this.paginatorProps = {
    onClick: this.setActive
  };
  this.showPaginator = true;

  // build children items
  // Will be called on each Slider child
  const iterateChild = (child, index) => {
    
    // check for SliderItem
    if (child.type === SliderItem) { 
      const propsClone = _.cloneDeep(child.props || {});
      delete propsClone.children;
      delete propsClone.isActive;
      delete propsClone.nextButton;
      
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
      
      return (
        <div 
          ref={ref}
          {...propsClone}
          className={classNames(SliderItem.defaultProps.className, child.props.className
            .replace(SliderItem.defaultProps.className,'')
          )}
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
      
      let bullets = child.props.items || React.Children
        .map(child.props.children, (childPaginator)=>{
          if (childPaginator.type === SliderPaginatorItem) {
            return childPaginator.props.children;
          } else {
            return null;
          }
        });
      
      if ( bullets || countSliderItems>1 ) {
        this.showPaginator = true;

        let isDefaultStyle = false;

        if (bullets && bullets.length !== countSliderItems) {
          isDefaultStyle = true;
          if (console && console.warn) { 
            console.warn(`Number of 'SliderPaginatorItem' elements diffs from number of 'SliderItem'\nDefault layout will be applied`);
          }
          bullets = undefined;
        }

        isDefaultStyle = isDefaultStyle || !bullets;

        if(!bullets) {
          bullets = Array.apply(null, {length: countSliderItems});          
        }
        
        const restProps = _.cloneDeep(child.props || {});
        delete restProps.children;

        this.paginatorProps = Object.assign({}, restProps, {
          onClick: this.setActive,
          defaultStyle: isDefaultStyle,
          bullets: bullets
        });
      }
    } else {
      // any other child is rendered as is
      return (child);
    }
  }
  return iterateChild.bind(this);
}

/**
 * Slider Component
 * 
 * @class Slider
 * @extends {Component}
 */
class Slider extends Component {

  /**
   * Creates an instance of Slider.
   * @param {any} props 
   * 
   * @memberof Slider
   */
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
    
    // set the scroll percent
    this.scrollPercent = typeof props.scrollPercent === 'number'? 
      {up: props.scrollPercent, down: props.scrollPercent }
      :
      Object.assign({}, props.scrollPercent);

    if (this.state.countSliderItems === 0) {
      if (console && console.warn) { 
        console.warn(`No 'SliderItem' on children of 'Slider'`);
      }
    }

    this.setActive = this.setActive.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollToPanel = this.scrollToPanel.bind(this);
    
    // set scroll event listener 
    window.addEventListener('scroll', this.handleScroll);

    // build children
    this.childrenToRender = React.Children
      .map(this.props.children, buildChildrenToRender.call(this));

    // no paginator declared use default
    if (!this.paginatorProps.bullets) {
      this.paginatorProps.bullets = Array.apply(null, {length: this.state.countSliderItems});
    }

  }
  componentDidMount() {
    // debugger;
    // const aItems = Object.keys(this.refs).map(key => this.refs[key]);

    // function getSumItemsHeightOffset(aItems, index, value) {      
    //   return aItems.slice(0, index+1).reduce(function(acc, item) {
    //     return acc + item.offsetHeight;
    //   }, 0) - aItems[index].offsetHeight/value;
    // }
    // this.paginatorItemsHeightOffset = aItems.map((item, index)=>{
    //   return index === 0? 0 : getSumItemsHeightOffset(aItems, index - 1, 2);
    // })
    


    // scroll to the active item
    setTimeout(()=> {      
      this.isMounting = true;
      this.scrollToPanel(this.state.activeIndex);      
    }, 100);
  }
  componentWillUnmount() {
    // remove scroll event listener
    window.removeEventListener('scroll', this.handleScroll);
  }
  /**
   * Scrolls to desired panel
   * 
   * @param {any} index 
   * @param {any} callback 
   * 
   * @memberof Slider
   */
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
  /**
   * Window scroll listener
   * 
   * @returns 
   * 
   * @memberof Slider
   */
  handleScroll() {
    if (this.isAnimating) {
      return;
    }
    
    /**
     * Get sum off offsetHeight for all slider items previous to an index item
     * decrement a specific amount of the last slider 
     * @param {number} [value=0.5|[0.1,0.9]] - the amount in percentage of the slider index offsetHeight to be left to scroll
     * when setting a different slider active 
     * Ex: 0.5 - means that we will set the next slider after scroll 50% of the active index
     */
    function _getSumOffset(items, index, value) {
      return items
        .slice(0, index + 1)
        .reduce(function(acc, item) {
          return acc + item.offsetHeight;
        }, 0) - items[index].offsetHeight*(value<0.1? 0.1 : value>0.9? 0.9 : value);
    }
    

    if (this.isMounting === false) { // on mounting dont change activeIndex
      const aItems = Object.keys(this.refs).map(key => this.refs[key]);
      const valueToUpIndex = _getSumOffset(aItems, this.state.activeIndex, this.scrollPercent.down);
      const valueToDownIndex = this.state.activeIndex>0? _getSumOffset(aItems, this.state.activeIndex - 1, this.scrollPercent.up) : 0;

      // up state (scroll down)
      if (window.scrollY > valueToUpIndex) {
        this.setActive(this.state.activeIndex + 1);
      // down state (scroll up)
      } else if (window.scrollY < valueToDownIndex) {
        this.setActive(this.state.activeIndex - 1);
      }
    }
    
    this.isMounting = false;
  }
  /**
   * Updates the index for the active panel on state
   * Called from the Paginator component or from the scroll handler
   * 
   * @param {any} index 
   * @param {any} scrollTo 
   * 
   * @memberof Slider
   */
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
        className={classNames(Slider.defaultProps.className, className
          .replace(Slider.defaultProps.className,'')
        )}
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
  animateSpeed: 1000,
  scrollPercent: {up: 0.75, down: 0.25}
}

Slider.propTypes = {
  /** Css class to apply to the element */
  className: PropTypes.string,
  /** Style attribute object to apply to the element */
  style: PropTypes.object,
  /** children */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  /** sets the animation speed for the slider */
  animateSpeed: PropTypes.number,
  /** sets the scroll amount relative to slider offsetHeight to activate next/previous slider */
  scrollPercent: PropTypes.oneOfType(
    [
      PropTypes.number,
      PropTypes.shape({
        up: PropTypes.number.isRequired,
        down: PropTypes.number.isRequired
      })
    ]
  ) 
};

export default Slider;
