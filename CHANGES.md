
## Changes 

Change the component to use component compound approach.

Allow to have an API around the component with

* Slider - the top container and state manager
* SliderItem - abstract component to wrap content items
* SliderButton - component to button next on bottom
* SliderPaginator - component to define paginator (to be done)

Advantages:

* abstract the component tree from html tag elements
* better control of render
* better customization of sub components like button and paginator 

```javascript

…

<Slider
  [className:string={'viewport-slider' className |'viewport-slider'}
  [style:object={style}
>
  <SliderItem 
    
    [isActive:bool=<true=default|false>]

    [isHidden:bool=<true|false=default>] * TODO
    
    [className:string={'viewport-slider-item' className |'viewport-slider-item'}
    
    [style:object={SliderItem.defaultProps.style + style | SliderItem.defaultProps.style}
    
    [defaultPaginator:bool=<true=default|false>] * TODO
    
    [nextButton:object={SliderItem.defaultProps | (nextButton.type===SliderButton? nextButton : <SliderButton>nextButton</SliderButton>}]

  >
    <!-- ... content ... -->
  </SliderItem>

  <SliderItem ... />
  <SliderItem ... />
  <SliderItem ... />
  ...
  <SlidePaginator * TODO
    className="" 
    style={{}}
  >
  </SlidePaginator>
  
</Slider>

…

```

Notes: <SlidePaginator /\> children:

* can be:
  * none - the default paginator will be used if defaultPaginator===true (default)
  * one children - is used to compose the paginators buttons
  * many as the number of items - to allow to compose distinct paginators buttons (if less childs are passed the default will be used if defaultPaginator===true)

* if only one item exists paginator is not shown
* if the respective item is hidden the button is not shown * TODO

