'use strict';

require('normalize.css');
require('./demo.css');

import React from 'react';
import ReactDOM from 'react-dom';

import { Slider, SliderItem, SliderButton, SliderPaginator, SliderPaginatorItem } from '../src';

// http://alpha.wallhaven.cc/wallpaper/164335
const wallpaper = 'http://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-164335.png';

const styleItem1 = { backgroundColor: '#a2d7c7', height: '100vh' };
const styleItem2 = { backgroundColor: '#353330', marginLeft: 250, width:'calc( 100% - 250px)', height: '100vh' };
const styleItem4 = { backgroundColor: '#b2d7c7', height: '100vh' };
const styleItem5 = { color: '#333', height: '100vh' };

const ButtonNextItem3 = () => {
  return (
    <div style={{width:300, height: 150, backgroundColor: '#aa0', color: '#000', textAlign: 'center'}}>
      <div style={{top: '50%', left: '50%', position: 'absolute', transform: 'translate(-50%, -50%)'}}>
        go down again!
      </div>      
    </div>
  );
}

class Demo extends React.Component {
  render() {
    return (
      <Slider
        className="ola"
        style={{backgroundColor: 'red'}}
        animateSpeed={2500}
      >
        <SliderPaginator 
          className="paginator-fixed"
          style={{backgroundColor: '#F00'}}
          defaultStyle={true}
        >
          
          <SliderPaginatorItem>One</SliderPaginatorItem>
          <SliderPaginatorItem>Two</SliderPaginatorItem>
          <SliderPaginatorItem>Three</SliderPaginatorItem>
          <SliderPaginatorItem>Four</SliderPaginatorItem>
          <SliderPaginatorItem>Five</SliderPaginatorItem>
        </SliderPaginator>
        
        <SliderItem style={styleItem1}>
          <div className="content">Hello, world.</div>
        </SliderItem>
        
        <SliderItem isActive
          style={styleItem2}
          className="classItem2"
        >
          <div className="content">Sup?</div>
          <div>I have different style ans css applied</div>
        </SliderItem>

        <SliderItem
          className="has-overlay"
          style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', height: '100vh' }}
          nextButton={<ButtonNextItem3 />}
        >
          <div className="content">Yo.</div>
          <div>I have a different next!</div>
        </SliderItem>

        <SliderItem 
          style={styleItem4}
          nextButton={
            <SliderButton className='button4'>^</SliderButton>
          }
        >
          <div className="content">Me too!</div>          
        </SliderItem>
        
        <SliderItem style={styleItem5}>
          <div className="content love">
            <i className="fa fa-heart"></i>
            <iframe src="http://ghbtns.com/github-btn.html?user=daviferreira&repo=react-viewport-slider&type=follow&count=true&size=large" allowTransparency="true" frameBorder="0" scrolling="0" width="auto" height="30" />
            <iframe src="http://ghbtns.com/github-btn.html?user=daviferreira&repo=react-viewport-slider&type=watch&count=true&size=large" allowTransparency="true" frameBorder="0" scrolling="0" width="auto" height="30" />
            <iframe src="http://ghbtns.com/github-btn.html?user=daviferreira&repo=react-viewport-slider&type=fork&count=true&size=large" allowTransparency="true" frameBorder="0" scrolling="0" width="auto" height="30" />
          </div>
        </SliderItem>

      </Slider>
    );
  }

}

ReactDOM.render(
  <Demo />,
  document.getElementById('demo')
);
/*

        
        

        
*/
