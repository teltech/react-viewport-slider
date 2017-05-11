
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

<Slider>
  <SliderItem 
    isActive={true|false}
    isHidden={true|false} * TODO
    className="content-one" 
    style={{}} 
    defaultPaginator={true*|false} * TODO
    nextButton={...}
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

